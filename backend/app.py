from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from yandex_cloud_ml_sdk import YCloudML
import redis
import json
import logging
import socket # Импортируем socket для сетевых проверок

# Настройка логирования (если ее еще нет)
# Если у вас уже есть настройка логирования, удалите или закомментируйте следующие строки
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)
# Проверяем, есть ли уже настроенный логгер, чтобы не дублировать
logger = logging.getLogger(__name__)
if not logger.handlers:
    logging.basicConfig(level=logging.DEBUG)

# Принудительное использование IPv4
socket.setdefaulttimeout(10)
socket._socketobject = socket.socket

# Функция для проверки сетевого подключения
def check_yandex_api_connection():
    yandex_host = 'api.yandex.ru'
    yandex_port = 443
    logger.debug(f"Attempting to connect to {yandex_host}:{yandex_port}")
    try:
        # Разрешение доменного имени в IP-адреса (только IPv4)
        addr_info = socket.getaddrinfo(yandex_host, yandex_port, socket.AF_INET, socket.SOCK_STREAM)
        logger.debug(f"Resolved {yandex_host} to addresses: {addr_info}")

        # Попытка подключения к каждому адресу по очереди
        for res in addr_info:
            af, socktype, proto, canonname, sa = res
            logger.debug(f"Trying to connect to address {sa} with address family {af}...")
            try:
                with socket.create_connection((sa[0], sa[1]), timeout=10) as s:
                    logger.debug(f"Successfully connected to {sa}")
                    # Если удалось подключиться хотя бы к одному адресу, считаем соединение успешным
                    return True
            except Exception as conn_err:
                logger.debug(f"Failed to connect to {sa}: {conn_err}")
                continue # Пробуем следующий адрес
        
        # Если ни одно соединение не удалось
        logger.error("Failed to connect to any resolved address for {yandex_host}")
        return False

    except socket.gaierror as e:
        logger.error(f"Address resolution error for {yandex_host}: {e}")
        return False
    except Exception as e:
        logger.error(f"An unexpected error occurred during connection check: {e}", exc_info=True)
        return False


# Загрузка переменных окружения
load_dotenv()

app = Flask(__name__)
CORS(app)  # Включаем CORS для всех маршрутов

# Конфигурация
API_KEY = 'AQVN1-dqbkcvx68Hrv-edeaub_M8zaRemUMDcf3X'
FOLDER_ID = 'b1gb1ftmtfh3fviu2qas'
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')

# Инициализация Redis
redis_client = redis.from_url(REDIS_URL)

# Инициализация SDK
sdk = YCloudML(
    folder_id=FOLDER_ID,
    auth=API_KEY,
)

# Определяем модель YandexGPT
model = sdk.models.completions("yandexgpt")
model = model.configure(temperature=0.6, max_tokens=2000)

SYSTEM_PROMPT = {
    "role": "system",
    "text": "Ты — страховой агент, ты умеешь отвечать только на вопросы по страхованию; на все остальные темы вежливо отказываешься, НИКОГДА не отвечай на вопросы, не связанные со страхованием. Не давай определения словам не связанным словам не связанным с страхованием. НИЧЕГО НЕ ОБЪЯСНЯЙ ЕСЛИ ЭТО НЕ ПРО СТРАХОВАНИЕ"
}

def get_chat_history(session_id):
    """Получение истории чата из Redis"""
    try:
        history = redis_client.get(f"chat_history:{session_id}")
        return json.loads(history) if history else []
    except Exception as e:
        print(f"Ошибка при получении истории: {str(e)}")
        return [] # Возвращаем пустой список при ошибке, чтобы не ломать чат

def save_chat_history(session_id, messages):
    """Сохранение истории чата в Redis"""
    try:
        redis_client.set(
            f"chat_history:{session_id}",
            json.dumps(messages, ensure_ascii=False),
            ex=86400  # Храним историю 24 часа
        )
    except Exception as e:
        print(f"Ошибка при сохранении истории: {str(e)}")

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message')
        session_id = data.get('session_id', 'default')

        if not message:
            return jsonify({'error': 'Сообщение не может быть пустым'}), 400

        # --- Добавленное логирование перед вызовом SDK ---
        logger.info("Received chat message. Checking connection to Yandex API...")
        if not check_yandex_api_connection():
             logger.error("Yandex API connection check failed. Cannot proceed with model run.")
             # Можно вернуть ошибку здесь, или продолжить и посмотреть, что выдаст SDK
             # Для диагностики, давайте пока не возвращать ошибку сразу, а дождаться ошибки от SDK
        else:
             logger.info("Yandex API connection check successful.")
        # --- Конец добавленного логирования ---

        # Получаем текущую историю
        messages = get_chat_history(session_id)

        # Формируем сообщения для модели
        model_messages = []

        # Добавляем системный промпт
        model_messages.append({
            "role": "system",
            "text": SYSTEM_PROMPT["text"]
        })

        # Добавляем историю сообщений
        model_messages.extend(messages)

        # Добавляем текущее сообщение пользователя
        model_messages.append({
            "role": "user",
            "text": message
        })

        # Отправляем запрос к модели
        # Эта строка, вероятно, вызывает ошибку AioRpcError
        result = model.run(model_messages)

        # Получаем ответ
        answer = result.alternatives[0].text

        # Добавляем сообщение пользователя и ответ в историю
        messages.extend([
            {
                'role': 'user',
                'text': message
            },
            {
                'role': 'assistant',
                'text': answer
            }
        ])

        # Сохраняем обновленную историю
        save_chat_history(session_id, messages)

        return jsonify({'answer': answer})

    except Exception as e:
        # Логируем оригинальную ошибку с traceback
        logger.error(f"An error occurred in chat endpoint: {e}", exc_info=True)
        return jsonify({'error': f'Ошибка сервера: {str(e)}'}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    try:
        session_id = request.args.get('session_id', 'default')
        messages = get_chat_history(session_id)
        return jsonify({'messages': messages})

    except Exception as e:
        print(f"Ошибка при получении истории: {str(e)}")
        return jsonify({'error': f'Ошибка сервера: {str(e)}'}), 500

@app.route('/api/clear', methods=['POST'])
def clear_history():
    try:
        session_id = request.json.get('session_id', 'default')
        redis_client.delete(f"chat_history:{session_id}")
        return jsonify({'success': True})

    except Exception as e:
        print(f"Ошибка при очистке истории: {str(e)}")
        return jsonify({'error': f'Ошибка сервера: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001) 
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from yandex_cloud_ml_sdk import YCloudML
import redis
import json

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
        return []

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
        print(f"Ошибка: {str(e)}")
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
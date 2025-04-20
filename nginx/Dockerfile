FROM nginx:alpine

# Установка certbot для автоматического получения SSL сертификатов
RUN apk add --no-cache certbot certbot-nginx

# Копирование конфигурации Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Создание директории для SSL сертификатов
RUN mkdir -p /etc/nginx/ssl/live/polisai.ru

# Скрипт для автоматического получения SSL сертификата
COPY init-letsencrypt.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/init-letsencrypt.sh

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"] 
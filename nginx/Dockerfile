FROM nginx:alpine

# Копирование конфигурации Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Создание директории для SSL сертификатов и установка прав
RUN mkdir -p /etc/nginx/ssl && \
    chown -R nginx:nginx /etc/nginx/ssl && \
    chmod 600 /etc/nginx/ssl

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"] 
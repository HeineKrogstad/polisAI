#!/bin/sh

# Замените на ваш email и домен
email="heinekrogstad@gmail.com"
domain="polisai.ru"

# Создание временной конфигурации для получения сертификата
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name $domain;
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}
EOF

# Перезапуск Nginx
nginx -s reload

# Получение сертификата
certbot certonly --nginx \
    --non-interactive \
    --agree-tos \
    --email $email \
    --domain $domain

# Обновление конфигурации Nginx
cat > /etc/nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name $domain;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $domain;

    ssl_certificate /etc/nginx/ssl/live/$domain/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/live/$domain/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://frontend:80;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /api {
        proxy_pass http://backend:5001;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Перезапуск Nginx
nginx -s reload 
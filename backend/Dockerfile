FROM python:3.11-slim

WORKDIR /app

# Установка переменных окружения для gRPC
ENV GRPC_DNS_RESOLVER=native
ENV GRPC_PYTHON_ENABLE_IPV6=0

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["python", "app.py"] 
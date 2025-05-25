# chat-app-realtime

Dự án Chat App Realtime là hệ thống nhắn tin thời gian thực dựa trên kiến trúc microservices.  
Các service bao gồm:
- **auth-service:** Xác thực và quản lý người dùng  
- **chat-service:** Xử lý tin nhắn thời gian thực  
- **notification-service:** Gửi thông báo  
- **gateway-service:** API Gateway định tuyến request

## Hướng dẫn chạy dự án
Sử dụng Docker Compose:
```bash
docker-compose up --build
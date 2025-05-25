# Sử dụng Node.js mới nhất
FROM node:latest

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Thiết lập biến môi trường
ENV PORT=3003
ENV REDIS_URL=redis://redis:6379
ENV MONGO_URI=mongodb://mongo:27017/notification_db

# Mở cổng 3003
EXPOSE 3003

# Chạy ứng dụng
CMD ["node", "src/server.js"]

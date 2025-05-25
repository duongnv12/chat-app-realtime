// src/server.js
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = require('socket.io')(server);

// Lắng nghe kết nối WebSocket
io.on('connection', (socket) => {
    console.log(`⚡ Client connected: ${socket.id}`);

    socket.on('sendMessage', (data) => {
        console.log(`📨 Tin nhắn nhận được: ${data.message}`);
        io.emit('receiveMessage', data);  // Gửi tin nhắn đến tất cả client
    });

    socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
    });
});


// Khởi chạy server
const port = process.env.PORT || 3002;
server.listen(port, () => {
    console.log(`Chat service đang chạy tại http://localhost:${port}`);
});

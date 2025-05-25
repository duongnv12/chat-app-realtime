const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const logger = require('./utils/logger');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    logger.info(`⚡ Client connected: ${socket.id}`);

    socket.on('newMessage', (data, callback) => {
        io.emit('notification', { message: `📩 Bạn có tin nhắn mới từ ${data.sender}` });

        // Gửi ACK để xác nhận client đã nhận thông báo
        if (callback) {
            callback({ status: 'received' });
        }
    });

    socket.on('disconnect', () => {
        logger.info(`❌ Client disconnected: ${socket.id}`);
    });
});

module.exports = { server, io };

const port = process.env.WS_PORT || 3007; // Cổng WebSocket
server.listen(port, () => {
    logger.info(`Notification WebSocket đang chạy tại http://localhost:${port}`);
});

const Notification = require('../models/Notification');
const redisClient = require('../utils/cache');
const { io } = require('../server');
const { notificationsSent, notificationsFailed } = require('../utils/metrics');
const logger = require('../utils/logger');

exports.sendNotification = async (req, res) => {
    const start = Date.now();
    try {
        const { receiver, message } = req.body;
        logger.info(`📨 Đang gửi thông báo cho ${receiver}`);

        await redisClient.publish('new_message', JSON.stringify({ receiver, message }));
        io.emit('notification', { message: `📩 Bạn có tin nhắn mới từ ${receiver}` });

        // Lưu thông báo vào database
        const newNotification = new Notification({ receiver, message });
        await newNotification.save();

        // Lưu thông báo vào Redis cache với TTL
        const cacheKey = `notification:${receiver}`;
        await redisClient.set(cacheKey, JSON.stringify({ receiver, message }), { EX: 86400 });

        res.status(201).json({ success: true });

        // Ghi nhận metric Prometheus
        notificationProcessingTime.observe(Date.now() - start);

        logger.info(`✅ Đã gửi thông báo thành công cho ${receiver}`);
    } catch (error) {
        logger.error(`🔥 Lỗi gửi thông báo: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const { receiver } = req.params;

        // Kiểm tra Redis cache trước
        const cacheKey = `notification:${receiver}`;
        const cachedNotifications = await redisClient.get(cacheKey);
        if (cachedNotifications) {
            logger.info(`📦 Lấy thông báo từ cache cho ${receiver}`);
            return res.json(JSON.parse(cachedNotifications));
        }

        // Nếu cache không có, truy vấn từ MongoDB
        const notifications = await Notification.find({ receiver }).sort({ timestamp: -1 });

        // Lưu vào cache Redis để truy xuất nhanh hơn lần sau
        await redisClient.set(cacheKey, JSON.stringify(notifications), { EX: 86400 });

        res.json(notifications);
    } catch (error) {
        logger.error(`🔥 Lỗi lấy thông báo: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

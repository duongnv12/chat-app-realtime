// src/controllers/chatController.js
const redisClient = require('../utils/cache');
const Message = require('../models/Message');
const breaker = require('../utils/circuitBreaker');
const { messageProcessingTime } = require('../utils/metrics');

exports.sendMessage = async (req, res) => {
    const start = Date.now();
    try {
        const { sender, receiver, message } = req.body;
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        messageProcessingTime.observe(Date.now() - start);
    }
};

exports.getChatHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Kiểm tra cache Redis
        const cachedHistory = await redisClient.get(`chat_history:${userId}`);
        if (cachedHistory) {
            return res.json(JSON.parse(cachedHistory));
        }

        // Truy vấn MongoDB nếu chưa có trong cache
        const messages = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] })
                                     .sort({ timestamp: -1 });

        // Lưu cache trong Redis
        await redisClient.set(`chat_history:${userId}`, JSON.stringify(messages), { EX: 300 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

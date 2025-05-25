const express = require('express');
const router = express.Router();
const axios = require('axios');
const { verifyToken } = require('../middlewares/authMiddleware');

const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL || 'http://chat-service:3002';

router.post('/send-message', verifyToken, async (req, res) => {
    try {
        const response = await axios.post(`${CHAT_SERVICE_URL}/send-message`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/messages', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${CHAT_SERVICE_URL}/messages`, { headers: req.headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

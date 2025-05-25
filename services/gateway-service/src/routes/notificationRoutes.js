const express = require('express');
const router = express.Router();
const axios = require('axios');
const { verifyToken } = require('../middlewares/authMiddleware');

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3003';

router.get('/notifications', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${NOTIFICATION_SERVICE_URL}/notifications`, { headers: req.headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const axios = require('axios');
const { verifyToken } = require('../middlewares/authMiddleware');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';

router.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const response = await axios.get(`${AUTH_SERVICE_URL}/profile`, { headers: req.headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

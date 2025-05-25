// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/send', chatController.sendMessage);
router.get('/history/:userId', chatController.getChatHistory);

module.exports = router;

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/history/:receiver', notificationController.getNotifications);
router.post('/send', notificationController.sendNotification);

module.exports = router;

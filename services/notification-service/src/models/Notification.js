const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);

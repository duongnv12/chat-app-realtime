// src/models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },    // ID của người gửi
    receiver: { type: String, required: true },  // ID của người nhận
    message: { type: String, required: true },   // Nội dung tin nhắn
    timestamp: { type: Date, default: Date.now }, // Thời gian gửi
    status: { type: String, enum: ['sent', 'received', 'read'], default: 'sent' } // Trạng thái tin nhắn
});

module.exports = mongoose.model('Message', MessageSchema);

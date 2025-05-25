const client = require('prom-client');

client.collectDefaultMetrics();  // Bắt đầu thu thập thông số hệ thống

const notificationsSent = new client.Counter({
    name: 'notifications_sent_total',
    help: 'Tổng số thông báo đã gửi thành công'
});

const notificationsFailed = new client.Counter({
    name: 'notifications_failed_total',
    help: 'Tổng số thông báo bị lỗi'
});

module.exports = { client, notificationsSent, notificationsFailed };

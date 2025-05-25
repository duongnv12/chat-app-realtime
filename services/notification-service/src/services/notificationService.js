const notifications = new Map();
const { io } = require('../server');

exports.sendNotification = (receiver, message) => {
    const lastNotification = notifications.get(receiver);
    const now = Date.now();

    if (!lastNotification || (now - lastNotification) > 3000) {  // Giới hạn 3 giây
        notifications.set(receiver, now);
        io.emit('notification', { message });
    }
};

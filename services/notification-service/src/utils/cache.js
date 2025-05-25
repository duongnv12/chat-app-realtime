const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

exports.setNotificationCache = async (key, data) => {
    await redisClient.set(key, JSON.stringify(data), { EX: 86400 }); // Thời gian tồn tại 24h
};

client.connect().catch((err) => console.error("🔥 Redis Connection Error:", err));

module.exports = client;

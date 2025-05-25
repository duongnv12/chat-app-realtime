const redis = require('redis');

const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.connect().catch((err) => console.error("🔥 Redis Connection Error:", err));

module.exports = client;

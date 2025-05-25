require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./utils/logger');
const notificationRoutes = require('./routes/notificationRoutes');
const breaker = require('./utils/circuitBreaker');
const { client, httpRequestDurationMilliseconds } = require('../src/utils/metrics');

const app = express();

app.use(express.json());
app.use(helmet()); // Bảo vệ API
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) }}));

app.use(async (req, res, next) => {
  try {
    await breaker.fire(() => next());
  } catch (error) {
    res.status(503).json({ message: 'Hệ thống đang quá tải, vui lòng thử lại sau!' });
  }
});

app.use('/api/notification', notificationRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'Notification service is running.' }));
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});


module.exports = app;

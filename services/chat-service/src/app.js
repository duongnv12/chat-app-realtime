// src/app.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const { httpRequestDurationMilliseconds } = require('./utils/metrics');

const app = express();

// Middleware: parse JSON body
app.use(express.json());

// Middleware logging HTTP request
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Middleware đo thời gian request
app.use((req, res, next) => {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        if (httpRequestDurationMilliseconds) {
            httpRequestDurationMilliseconds.labels(req.method, req.originalUrl, res.statusCode).observe(elapsedMs);
        }
    });

    next();
});

// Import routes
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

// Endpoint health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Chat service is running.' });
});

// Endpoint để Prometheus lấy metrics
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
});

module.exports = app;

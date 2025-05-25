const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { apiLimiter } = require('./middlewares/rateLimiter');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(apiLimiter); // Chặn spam request

// Định tuyến API Gateway
app.use('/auth', require('./routes/authRoutes'));
app.use('/chat', require('./routes/chatRoutes'));
app.use('/notification', require('./routes/notificationRoutes'));

module.exports = app;

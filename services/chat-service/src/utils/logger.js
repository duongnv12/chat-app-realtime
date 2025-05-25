// src/utils/logger.js
const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, errors } = format;

// Định dạng log chuẩn
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/chat-service.log' })
  ]
});

module.exports = logger;

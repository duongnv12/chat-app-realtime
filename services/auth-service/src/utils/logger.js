// src/utils/logger.js
const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, errors } = format;

// Định dạng log mà chúng ta mong muốn
const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Tạo Logger
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Ghi log lỗi kèm stack trace
    myFormat
  ),
  transports: [
    new transports.Console(),                         // Ghi log ra console
    new transports.File({ filename: 'logs/app.log' })   // Ghi log ra file
  ]
});

module.exports = logger;

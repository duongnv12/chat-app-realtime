const rateLimit = require('express-rate-limit');

exports.apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 phút
    max: 50, // Tối đa 50 request/phút
    message: "Too many requests, please try again later.",
});

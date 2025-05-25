const User = require('../models/User');
const jwt = require('jsonwebtoken');
const redisClient = require('../utils/cache');

exports.register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const cachedToken = await redisClient.get(email);
        console.log("🔍 Redis Token:", cachedToken);

        if (cachedToken) {
            return res.json({ token: cachedToken });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await redisClient.set(email, token, { EX: 3600 });

        res.json({ token });
    } catch (error) {
        console.error("🔥 Login error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
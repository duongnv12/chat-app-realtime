// src/services/authService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

exports.register = async (userData) => {
  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const newUser = new User({
    email: userData.email,
    password: hashedPassword,
  });
  await newUser.save();
  return { id: newUser._id, email: newUser.email };
};

exports.login = async (credentials) => {
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    throw new Error('Không tìm thấy người dùng.');
  }
  const isMatch = await bcrypt.compare(credentials.password, user.password);
  if (!isMatch) {
    throw new Error('Mật khẩu không đúng.');
  }
  // Tạo JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  return token;
};

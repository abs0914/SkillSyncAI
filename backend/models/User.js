const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Email field added for password reset
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

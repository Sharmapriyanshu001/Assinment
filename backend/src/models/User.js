const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    sparse: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    sparse: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

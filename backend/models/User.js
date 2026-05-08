const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  focusHours: { type: Number, default: 0 },
  tasks: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  redeemedItems: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    redeemedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
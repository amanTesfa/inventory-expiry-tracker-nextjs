const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  type: { type: String, enum: ['Email', 'SMS', 'Dashboard'], default: 'Dashboard' },
  sentAt: { type: Date, default: Date.now },
  message: { type: String },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);

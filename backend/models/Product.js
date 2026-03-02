const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  alertBeforeDays: { type: Number, default: 7 },
});

module.exports = mongoose.model('Product', productSchema);

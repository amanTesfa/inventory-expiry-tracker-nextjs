const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  expiredProducts: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      batchNumber: { type: String },
      quantity: { type: Number },
      cost: { type: Number },
    }
  ],
  totalLoss: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);

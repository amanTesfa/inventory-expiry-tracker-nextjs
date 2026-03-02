const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  batchNumber: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchasePrice: { type: Number },
  manufactureDate: { type: Date },
  expiryDate: { type: Date, required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  status: {
    type: String,
    enum: ['Fresh', 'Near Expiry', 'Critical', 'Expired'],
    default: 'Fresh',
  },
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);

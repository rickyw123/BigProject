const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  item: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
      },
      qty: {
        type: Number
      }
    }
  ],
  total: {
    type: Number
  },
  status: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);
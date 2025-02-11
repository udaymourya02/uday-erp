import mongoose from 'mongoose';

const financeSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    required: true,
    enum: ['income', 'expense']
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Finance = mongoose.model('Finance', financeSchema);
export default Finance;
import mongoose from 'mongoose';

const productionSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['planned', 'in progress', 'completed', 'cancelled'],
    default: 'planned'
  }
}, {
  timestamps: true
});

const Production = mongoose.model('Production', productionSchema);
export default Production;
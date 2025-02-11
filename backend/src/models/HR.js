import mongoose from 'mongoose';

const hrSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  hireDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'on leave', 'terminated'],
    default: 'active'
  }
}, {
  timestamps: true
});

const HR = mongoose.model('HR', hrSchema);
export default HR;
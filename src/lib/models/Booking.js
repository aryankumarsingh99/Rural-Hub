// src/lib/models/Booking.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    enum: [
      'Agricultural Consulting',
      'Equipment Rental',
      'Financial Services',
      'Healthcare Services',
      'Education & Training',
      'Transportation'
    ]
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  totalAmount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export default Booking;
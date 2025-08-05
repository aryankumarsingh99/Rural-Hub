// src/models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  category: {
    type: String,
    enum: ['general', 'support', 'complaint', 'suggestion', 'business', 'other'],
    default: 'general',
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  respondedAt: {
    type: Date,
  },
  response: {
    type: String,
  },
}, {
  timestamps: true,
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
export default Contact;
// src/models/Service.js
import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['agriculture', 'healthcare', 'education', 'transportation', 'financial', 'other'],
  },
  provider: {
    type: String,
    required: [true, 'Service provider is required'],
  },
  contact: {
    phone: String,
    email: String,
    address: String,
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
  },
  availability: {
    type: String,
    enum: ['available', 'unavailable', 'limited'],
    default: 'available',
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  features: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export default Service;
// src/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['groceries', 'electronics', 'clothing', 'books', 'home-garden', 'health', 'food', 'agriculture', 'healthcare']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountPrice: {
    type: Number,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  images: [{
    type: String
  }],
  brand: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  features: [String],
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  provider: String,
  contact: {
    phone: String,
    email: String,
    address: String
  },
  type: {
    type: String,
    enum: ['product', 'service'],
    default: 'product'
  }
}, {
  timestamps: true
});

// Index for search functionality
ProductSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
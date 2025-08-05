// src/models/News.js
import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'News title is required'],
    trim: true,
  },
  summary: {
    type: String,
    required: [true, 'News summary is required'],
  },
  content: {
    type: String,
    required: [true, 'News content is required'],
  },
  category: {
    type: String,
    required: [true, 'News category is required'],
    enum: ['local', 'agriculture', 'government', 'weather', 'market', 'health', 'education', 'other'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  source: {
    type: String,
    required: [true, 'News source is required'],
  },
  image: {
    type: String,
    default: '',
  },
  tags: [String],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const News = mongoose.models.News || mongoose.model('News', NewsSchema);
export default News;
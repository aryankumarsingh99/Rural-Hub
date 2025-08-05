// src/scripts/seedDatabase.js
import mongoose from 'mongoose';
import Service from '../models/Service.js';
import Product from '../models/Product.js';
import News from '../models/News.js';
import connectDB from '../lib/connectDB.js';

const services = [
  {
    name: "Tractor Rental Service",
    description: "Modern tractors for farming with experienced operators",
    category: "agriculture",
    provider: "Rural Farm Equipment Co.",
    contact: {
      phone: "+1-555-0101",
      email: "tractors@ruralequip.com",
      address: "123 Farm Road, Green Valley, State 12345"
    },
    price: 75,
    rating: 4.7,
    features: ["GPS Navigation", "Auto-steering", "Multiple attachments"],
    availability: "available",
    image: "https://images.unsplash.com/photo-1581092335878-3d9b87dd2e62?w=600",
  },
  {
    name: "Mobile Veterinary Clinic",
    description: "Professional veterinary services for livestock and pets",
    category: "healthcare",
    provider: "Country Vet Services",
    contact: {
      phone: "+1-555-0202",
      email: "care@countryvet.com",
      address: "456 Health Ave, Care County, State 12345"
    },
    price: 50,
    rating: 4.9,
    features: ["Emergency visits", "Vaccinations", "Health checkups"],
    availability: "available",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600",
  },
  {
    name: "Solar Panel Installation",
    description: "Clean energy solutions for rural homes and farms",
    category: "other",
    provider: "Green Energy Solutions",
    contact: {
      phone: "+1-555-0303",
      email: "solar@greenenergy.com",
      address: "789 Solar St, Energy City, State 12345"
    },
    price: 200,
    rating: 4.5,
    features: ["Free consultation", "25-year warranty", "Government rebates"],
    availability: "available",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600",
  }
];

const products = [
  {
    name: "Organic Tomato Seeds",
    description: "High-yield organic tomato seeds perfect for home gardens",
    category: "groceries",
    price: 12.99,
    discountPrice: 9.99,
    stock: 150,
    brand: "Organic Harvest",
    images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400"],
    rating: 4.8,
    seller: "Local Seed Company",
    specifications: {
      "Seed Count": "50 seeds",
      "Germination Rate": "95%",
      "Days to Harvest": "70-80 days",
      "Plant Type": "Indeterminate"
    },
    tags: ["organic", "seeds", "tomato", "gardening"],
    isFeatured: true,
  },
  {
    name: "Farm Fresh Honey",
    description: "Pure wildflower honey from local beekeepers",
    category: "groceries",
    price: 18.99,
    stock: 75,
    brand: "Countryside Honey",
    images: ["https://images.unsplash.com/photo-1587049332974-c7aaf17ba03d?w=400"],
    rating: 4.9,
    seller: "Bee Happy Farm",
    specifications: {
      "Weight": "1 lb (454g)",
      "Type": "Wildflower",
      "Processing": "Raw & Unfiltered",
      "Origin": "Local Farms"
    },
    tags: ["honey", "natural", "local", "raw"],
    isFeatured: true,
  },
  {
    name: "Digital Soil pH Meter",
    description: "Accurate soil testing device for optimal farming",
    category: "electronics",
    price: 89.99,
    discountPrice: 69.99,
    stock: 30,
    brand: "AgriTech Pro",
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"],
    rating: 4.4,
    seller: "Farm Equipment Store",
    specifications: {
      "Measurement Range": "pH 3.5-9.0",
      "Accuracy": "±0.2 pH",
      "Display": "Digital LCD",
      "Power": "9V Battery"
    },
    tags: ["soil", "testing", "farming", "digital"],
    isFeatured: false,
  }
];

const newsArticles = [
  {
    title: "Government Announces $50M Rural Development Fund",
    summary: "New funding program supports infrastructure and technology upgrades in rural communities",
    content: "The Department of Agriculture announced a comprehensive $50 million funding program designed to accelerate rural development across the nation. The initiative focuses on three key areas: infrastructure modernization, technology adoption, and sustainable farming practices...",
    category: "government",
    author: "Sarah Johnson",
    source: "Rural Development News",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
    priority: "high",
    tags: ["funding", "government", "development", "infrastructure"],
    publishedAt: new Date(),
  },
  {
    title: "Record Harvest Expected This Season",
    summary: "Favorable weather conditions lead to projected 15% increase in crop yields",
    content: "Agricultural experts predict this season will see record-breaking harvests across multiple crop categories. The combination of optimal rainfall, temperature patterns, and advanced farming techniques has created ideal growing conditions...",
    category: "agriculture",
    author: "Mike Thompson",
    source: "Farm Weekly",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600",
    priority: "medium",
    tags: ["harvest", "crops", "weather", "yields"],
    publishedAt: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    title: "Severe Weather Warning: Prepare Your Livestock",
    summary: "Storm system approaching region - farmers advised to secure animals and equipment",
    content: "The National Weather Service has issued a severe weather warning for our region. A powerful storm system is expected to bring high winds, heavy rain, and possible hail. Farmers are strongly advised to bring livestock to shelter...",
    category: "weather",
    author: "Weather Service",
    source: "Emergency Alert System",
    image: "https://images.unsplash.com/photo-1419833479618-c595710de72e?w=600",
    priority: "urgent",
    tags: ["weather", "storm", "warning", "livestock"],
    publishedAt: new Date(Date.now() - 3600000), // 1 hour ago
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Service.deleteMany({});
    await Product.deleteMany({});
    await News.deleteMany({});

    // Insert services
    console.log('📋 Inserting services...');
    const insertedServices = await Service.insertMany(services);
    console.log(`✅ Inserted ${insertedServices.length} services`);

    // Insert products
    console.log('📦 Inserting products...');
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Insert news
    console.log('📰 Inserting news articles...');
    const insertedNews = await News.insertMany(newsArticles);
    console.log(`✅ Inserted ${insertedNews.length} news articles`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Services: ${insertedServices.length}`);
    console.log(`   Products: ${insertedProducts.length}`);
    console.log(`   News: ${insertedNews.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
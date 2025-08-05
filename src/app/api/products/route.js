// src/app/api/products/route.js
import Product from '@/models/Product';
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

// Sample products data
const sampleProducts = [
  {
    name: "Fresh Bread Daily",
    description: "Locally baked fresh bread delivered daily. Made with organic flour and natural ingredients.",
    category: "food",
    price: 8,
    discountPrice: 6,
    stock: 50,
    images: ["https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400"],
    brand: "Village Bakery",
    rating: 4.7,
    features: ["Whole Wheat", "Sourdough", "Multigrain"],
    tags: ["fresh", "organic", "daily", "bakery"],
    isFeatured: true,
    isActive: true,
    provider: "Village Bakery",
    contact: {
      phone: "+1-555-0303",
      email: "orders@villagebakery.com",
      address: "789 Baker St, Wheat Town"
    },
    type: "product"
  },
  {
    name: "Farm Fresh Butter",
    description: "Organic butter made from grass-fed cow milk. Rich, creamy, and naturally delicious.",
    category: "food",
    price: 12,
    discountPrice: 10,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400"],
    brand: "Green Valley Farm",
    rating: 4.9,
    features: ["Organic", "Grass-fed", "No Preservatives"],
    tags: ["organic", "dairy", "fresh", "farm"],
    isFeatured: true,
    isActive: true,
    provider: "Green Valley Farm",
    contact: {
      phone: "+1-555-0404",
      email: "fresh@greenvalley.com",
      address: "321 Dairy Lane, Cow County"
    },
    type: "product"
  },
  {
    name: "Organic Milk",
    description: "Pure organic milk from grass-fed cows. Fresh and nutritious.",
    category: "food",
    price: 6,
    discountPrice: 5,
    stock: 40,
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"],
    brand: "Green Valley Farm",
    rating: 4.8,
    features: ["Organic", "Grass-fed", "Fresh"],
    tags: ["milk", "organic", "dairy", "fresh"],
    isFeatured: false,
    isActive: true,
    provider: "Green Valley Farm",
    type: "product"
  },
  {
    name: "Free Range Eggs",
    description: "Farm fresh eggs from free-range chickens. Rich in nutrients and flavor.",
    category: "food",
    price: 8,
    discountPrice: 7,
    stock: 25,
    images: ["https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400"],
    brand: "Happy Hens Farm",
    rating: 4.6,
    features: ["Free Range", "Organic Feed", "Fresh"],
    tags: ["eggs", "free-range", "organic", "farm"],
    isFeatured: false,
    isActive: true,
    provider: "Happy Hens Farm",
    type: "product"
  },
  {
    name: "Honey (Raw & Natural)",
    description: "Pure raw honey harvested from local beehives. Unprocessed and natural.",
    category: "food",
    price: 15,
    discountPrice: 12,
    stock: 20,
    images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"],
    brand: "Bee Happy Apiaries",
    rating: 4.9,
    features: ["Raw", "Unprocessed", "Local"],
    tags: ["honey", "raw", "natural", "sweet"],
    isFeatured: true,
    isActive: true,
    provider: "Bee Happy Apiaries",
    type: "product"
  }
];

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort') || 'name';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;

    // Check if we have products in database, if not, seed with sample data
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(sampleProducts);
    }

    // Build query
    let query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts,
          hasMore: page * limit < totalProducts
        }
      }
    });

  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const productData = await request.json();
    const product = new Product(productData);
    await product.save();

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
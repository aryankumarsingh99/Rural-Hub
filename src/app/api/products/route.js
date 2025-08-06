// src/app/api/products/route.js
import { NextResponse } from 'next/server';

// Sample products data
const products = [
  {
    _id: "1",
    name: "Fresh Organic Apples",
    description: "Locally grown organic apples, fresh from the farm",
    price: 4.99,
    discountPrice: 3.99,
    stock: 50,
    category: "fruits",
    images: ["https://images.unsplash.com/photo-1567306301408-9b74a8543977?w=400"],
    farmer: "Green Valley Farm",
    location: "Rural Valley",
    inStock: true,
    type: "product"
  },
  {
    _id: "2",
    name: "Farm Fresh Milk",
    description: "Pure cow milk from grass-fed cows",
    price: 3.50,
    discountPrice: 2.99,
    stock: 30,
    category: "dairy",
    images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"],
    farmer: "Dairy Hills Farm",
    location: "Countryside",
    inStock: true,
    type: "product"
  },
  {
    _id: "3",
    name: "Organic Vegetables Box",
    description: "Mixed seasonal vegetables, organically grown",
    price: 15.99,
    discountPrice: 12.99,
    stock: 25,
    category: "vegetables",
    images: ["https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400"],
    farmer: "Organic Gardens",
    location: "Green Valley",
    inStock: true,
    type: "product"
  },
  {
    _id: "4",
    name: "Fresh Bread",
    description: "Homemade bread baked daily with local ingredients",
    price: 2.50,
    discountPrice: 1.99,
    stock: 40,
    category: "bakery",
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"],
    farmer: "Village Bakery",
    location: "Main Street",
    inStock: true,
    type: "product"
  },
  {
    _id: "5",
    name: "Farm Butter",
    description: "Creamy butter made from fresh farm cream",
    price: 4.25,
    discountPrice: 3.50,
    stock: 35,
    category: "dairy",
    images: ["https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400"],
    farmer: "Dairy Hills Farm",
    location: "Countryside",
    inStock: true,
    type: "product"
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 20;

    let filteredProducts = products;

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    filteredProducts = filteredProducts.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: {
        products: filteredProducts,
        total: filteredProducts.length
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
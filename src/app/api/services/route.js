// src/app/api/services/route.js
import Service from '@/models/Service';
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } }
      ];
    }

    // Get services with pagination
    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalServices = await Service.countDocuments(query);
    const totalPages = Math.ceil(totalServices / limit);

    // If no services found, return sample data
    if (services.length === 0) {
      // ...existing code...
const sampleServices = [
  {
    _id: "sample1",
    name: "Agricultural Equipment Rental",
    description: "Rent modern farming equipment for better crop yield",
    category: "agriculture",
    provider: "Farm Tech Solutions",
    contact: {
      phone: "+1-555-0101",
      email: "contact@farmtech.com",
      address: "123 Farm Road, Rural Valley"
    },
    price: 50,
    discountPrice: 45, // Add discount price for cart compatibility
    stock: 10, // Add stock for cart validation
    images: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400"], // Add images
    rating: 4.5,
    features: ["Tractors", "Harvesters", "Irrigation Systems"],
    availability: "available",
    isActive: true,
    type: "service", // Add type to distinguish from products
    createdAt: new Date()
  },
  {
    _id: "sample2",
    name: "Mobile Health Clinic",
    description: "Healthcare services delivered to your doorstep",
    category: "healthcare",
    provider: "Rural Health Network",
    contact: {
      phone: "+1-555-0202",
      email: "health@ruralcare.com",
      address: "456 Health Ave, Care County"
    },
    price: 25,
    discountPrice: 20,
    stock: 5,
    images: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"],
    rating: 4.8,
    features: ["General Checkup", "Vaccinations", "Emergency Care"],
    availability: "available",
    isActive: true,
    type: "service",
    createdAt: new Date()
  },
  // Add more service items that can be "products"
  {
    _id: "sample3",
    name: "Fresh Bread Daily",
    description: "Locally baked fresh bread delivered daily",
    category: "food",
    provider: "Village Bakery",
    contact: {
      phone: "+1-555-0303",
      email: "orders@villagebakery.com",
      address: "789 Baker St, Wheat Town"
    },
    price: 8,
    discountPrice: 6,
    stock: 50,
    images: ["https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400"],
    rating: 4.7,
    features: ["Whole Wheat", "Sourdough", "Multigrain"],
    availability: "available",
    isActive: true,
    type: "product",
    createdAt: new Date()
  },
  {
    _id: "sample4",
    name: "Farm Fresh Butter",
    description: "Organic butter made from grass-fed cow milk",
    category: "food",
    provider: "Green Valley Farm",
    contact: {
      phone: "+1-555-0404",
      email: "fresh@greenvalley.com",
      address: "321 Dairy Lane, Cow County"
    },
    price: 12,
    discountPrice: 10,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400"],
    rating: 4.9,
    features: ["Organic", "Grass-fed", "No Preservatives"],
    availability: "available",
    isActive: true,
    type: "product",
    createdAt: new Date()
  }
];
// ...existing code...

      return NextResponse.json({
        success: true,
        data: {
          services: sampleServices,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalServices: sampleServices.length,
            hasNextPage: false,
            hasPrevPage: false,
          },
          categories: ["agriculture", "healthcare", "education", "transportation"]
        }
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      data: {
        services,
        pagination: {
          currentPage: page,
          totalPages,
          totalServices,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch services",
        details: error.message
      },
      { status: 500 }
    );
  }
}
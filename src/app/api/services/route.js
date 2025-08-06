// src/app/api/services/route.js
import { NextResponse } from 'next/server';

// Sample services data
const services = [
  {
    id: 1,
    title: "Healthcare Services",
    description: "Comprehensive medical care and health services for rural communities",
    icon: "🏥",
    category: "healthcare",
    provider: "Rural Health Center",
    contact: "+1-555-0101",
    location: "Main Street Medical Center",
    availability: "24/7 Emergency, Mon-Fri 8AM-6PM Regular"
  },
  {
    id: 2,
    title: "Agricultural Support",
    description: "Farming assistance, crop consulting, and agricultural equipment rental",
    icon: "🌾",
    category: "agriculture",
    provider: "Farm Support Co-op",
    contact: "+1-555-0102",
    location: "Agricultural Extension Office",
    availability: "Mon-Sat 6AM-8PM"
  },
  {
    id: 3,
    title: "Educational Services",
    description: "Adult education, skill development, and literacy programs",
    icon: "📚",
    category: "education",
    provider: "Rural Learning Center",
    contact: "+1-555-0103",
    location: "Community Learning Hub",
    availability: "Mon-Fri 9AM-5PM, Sat 10AM-2PM"
  },
  {
    id: 4,
    title: "Transportation Services",
    description: "Local transport, delivery services, and emergency transportation",
    icon: "🚗",
    category: "transportation",
    provider: "Rural Transit Authority",
    contact: "+1-555-0104",
    location: "Central Transit Hub",
    availability: "Daily 5AM-11PM"
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filteredServices = services;

    if (category && category !== 'all') {
      filteredServices = filteredServices.filter(service => 
        service.category === category
      );
    }

    if (search) {
      filteredServices = filteredServices.filter(service =>
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredServices
    });
  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
// src/app/api/services/route.js
import { NextResponse } from 'next/server';

const services = [
  {
    _id: "1",
    title: "Healthcare Services",
    description: "Comprehensive medical care and health services for rural communities",
    icon: "🏥",
    category: "healthcare",
    provider: "Rural Health Center",
    contact: "+1-555-0101",
    location: "Main Street Medical Center",
    availability: "24/7 Emergency, Mon-Fri 8AM-6PM Regular",
    price: 50,
    type: "service"
  },
  {
    _id: "2",
    title: "Agricultural Support",
    description: "Farming assistance, crop consulting, and agricultural equipment rental",
    icon: "🌾",
    category: "agriculture",
    provider: "Farm Support Co-op",
    contact: "+1-555-0102",
    location: "Agricultural Extension Office",
    availability: "Mon-Sat 6AM-8PM",
    price: 75,
    type: "service"
  },
  {
    _id: "3",
    title: "Educational Services",
    description: "Adult education, skill development, and literacy programs",
    icon: "📚",
    category: "education",
    provider: "Rural Learning Center",
    contact: "+1-555-0103",
    location: "Community Learning Hub",
    availability: "Mon-Fri 9AM-5PM, Sat 10AM-2PM",
    price: 30,
    type: "service"
  },
  {
    _id: "4",
    title: "Transportation Services",
    description: "Local transport, delivery services, and emergency transportation",
    icon: "🚗",
    category: "transportation",
    provider: "Rural Transit Authority",
    contact: "+1-555-0104",
    location: "Central Transit Hub",
    availability: "Daily 5AM-11PM",
    price: 25,
    type: "service"
  },
  {
    _id: "5",
    title: "Banking & Financial Services",
    description: "Mobile banking, microfinance, and financial literacy programs",
    icon: "🏦",
    category: "finance",
    provider: "Rural Credit Union",
    contact: "+1-555-0105",
    location: "Community Bank Branch",
    availability: "Mon-Fri 9AM-4PM",
    price: 0,
    type: "service"
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
      data: {
        services: filteredServices,
        total: filteredServices.length
      }
    });
  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
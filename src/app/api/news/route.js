// src/app/api/news/route.js
import { NextResponse } from 'next/server';

// Sample news data
const news = [
  {
    id: 1,
    title: "New Agricultural Subsidies Announced for Rural Farmers",
    excerpt: "Government announces new support programs to help rural farmers with crop insurance and equipment financing.",
    content: "The government has announced a comprehensive package of agricultural subsidies aimed at supporting rural farmers...",
    author: "Rural News Team",
    publishedAt: new Date().toISOString(),
    category: "agriculture",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    featured: true
  },
  {
    id: 2,
    title: "Rural Healthcare Initiative Expands to 50 New Communities",
    excerpt: "Mobile health units and telemedicine services now available in remote areas across the region.",
    content: "A new healthcare initiative is bringing medical services directly to rural communities...",
    author: "Health Reporter",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "healthcare",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    featured: false
  },
  {
    id: 3,
    title: "Digital Literacy Programs Launch in Rural Schools",
    excerpt: "New computer labs and internet connectivity projects aim to bridge the digital divide.",
    content: "Education officials have launched comprehensive digital literacy programs...",
    author: "Education Correspondent",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    category: "education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    featured: true
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit')) || 10;

    let filteredNews = news;

    if (category && category !== 'all') {
      filteredNews = filteredNews.filter(article => 
        article.category === category
      );
    }

    if (featured === 'true') {
      filteredNews = filteredNews.filter(article => article.featured);
    }

    filteredNews = filteredNews.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: filteredNews
    });
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
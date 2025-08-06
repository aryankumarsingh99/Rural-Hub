// src/app/api/news/route.js
import { NextResponse } from 'next/server';

const news = [
  {
    _id: "1",
    title: "New Agricultural Subsidies Announced for Rural Farmers",
    excerpt: "Government announces new support programs to help rural farmers with crop insurance and equipment financing.",
    content: "The government has announced a comprehensive package of agricultural subsidies aimed at supporting rural farmers. This initiative includes crop insurance programs, low-interest loans for equipment, and technical support for sustainable farming practices.",
    author: "Rural News Team",
    publishedAt: new Date().toISOString(),
    category: "agriculture",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    featured: true,
    readTime: "5 min read"
  },
  {
    _id: "2",
    title: "Rural Healthcare Initiative Expands to 50 New Communities",
    excerpt: "Mobile health units and telemedicine services now available in remote areas across the region.",
    content: "A new healthcare initiative is bringing medical services directly to rural communities through mobile health units and telemedicine services. The program aims to bridge the healthcare gap in underserved areas.",
    author: "Health Reporter",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "healthcare",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    featured: false,
    readTime: "3 min read"
  },
  {
    _id: "3",
    title: "Digital Literacy Programs Launch in Rural Schools",
    excerpt: "New computer labs and internet connectivity projects aim to bridge the digital divide.",
    content: "Education officials have launched comprehensive digital literacy programs in rural schools. The initiative includes setting up computer labs, providing internet connectivity, and training teachers in digital education methods.",
    author: "Education Correspondent",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    category: "education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    featured: true,
    readTime: "4 min read"
  },
  {
    _id: "4",
    title: "Sustainable Farming Practices Show Promising Results",
    excerpt: "Local farmers report increased yields and reduced costs through organic farming methods.",
    content: "Rural farmers who have adopted sustainable and organic farming practices are reporting significant improvements in both crop yields and cost reduction. The success stories are encouraging more farmers to make the transition.",
    author: "Agriculture Specialist",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    category: "agriculture",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
    featured: false,
    readTime: "6 min read"
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
      data: {
        news: filteredNews,
        total: filteredNews.length
      }
    });
  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
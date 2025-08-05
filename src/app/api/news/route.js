// src/app/api/news/route.js
import News from '@/models/News';
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
    let query = { isPublished: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Get news with pagination
    const news = await News.find(query)
      .sort({ priority: -1, publishedAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalNews = await News.countDocuments(query);
    const totalPages = Math.ceil(totalNews / limit);

    // If no news found, return sample data
    if (news.length === 0) {
      const sampleNews = [
        {
          _id: "sample1",
          title: "New Government Subsidy for Rural Farmers",
          summary: "Government announces new financial support program for small-scale farmers",
          content: "The government has announced a new subsidy program aimed at supporting rural farmers with modern equipment and training. This initiative will provide up to $10,000 in grants for eligible farmers...",
          category: "government",
          author: "John Reporter",
          source: "Rural Times",
          image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
          priority: "high",
          isPublished: true,
          publishedAt: new Date(),
          views: 150,
          tags: ["subsidy", "farmers", "government"]
        },
        {
          _id: "sample2",
          title: "Weather Alert: Heavy Rains Expected",
          summary: "Meteorological department predicts heavy rainfall in the region",
          content: "The local weather department has issued an alert for heavy rains expected in the coming week. Farmers are advised to take necessary precautions to protect their crops...",
          category: "weather",
          author: "Weather Dept",
          source: "Met Office",
          image: "https://images.unsplash.com/photo-1419833479618-c595710de72e?w=600",
          priority: "urgent",
          isPublished: true,
          publishedAt: new Date(),
          views: 89,
          tags: ["weather", "rain", "alert"]
        },
        {
          _id: "sample3",
          title: "New Market Opens for Local Produce",
          summary: "Local farmers get new platform to sell their produce directly to consumers",
          content: "A new marketplace has opened in the town center, providing local farmers with a direct channel to sell their fresh produce to consumers. This initiative aims to support local agriculture...",
          category: "market",
          author: "Sarah Johnson",
          source: "Local News",
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600",
          priority: "medium",
          isPublished: true,
          publishedAt: new Date(Date.now() - 86400000), // 1 day ago
          views: 75,
          tags: ["market", "farmers", "local"]
        }
      ];

      return NextResponse.json({
        success: true,
        data: {
          news: sampleNews,
          urgentNews: sampleNews.filter(n => n.priority === 'urgent'),
          featuredNews: sampleNews.filter(n => n.priority === 'high'),
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalNews: sampleNews.length,
            hasNextPage: false,
            hasPrevPage: false,
          },
          categories: ["government", "weather", "market", "agriculture", "health"]
        }
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      data: {
        news,
        pagination: {
          currentPage: page,
          totalPages,
          totalNews,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('News fetch error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch news",
        details: error.message
      },
      { status: 500 }
    );
  }
}
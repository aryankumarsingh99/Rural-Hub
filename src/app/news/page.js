// src/app/news/page.js
"use client";
import { useState, useEffect } from 'react';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [urgentNews, setUrgentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        let url = '/api/news?';
        if (category !== 'all') url += `category=${category}&`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setNews(data.data.news);
          setUrgentNews(data.data.urgentNews || []);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [category]);

  if (loading) return (
    <div className="flex justify-center items-center bg-white min-h-screen">
      <div className="text-xl text-black">Loading news...</div>
    </div>
  );

  return (
    <div className="container mx-auto bg-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Latest News</h1>
      
      {/* Category Filter */}
      <div className="mb-8 flex justify-center">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-700 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option className='text-black' value="all">All Categories</option>
          <option className='text-black' value="local">Local</option>
          <option className='text-black' value="agriculture">Agriculture</option>
          <option className='text-black' value="government">Government</option>
          <option className='text-black' value="weather">Weather</option>
          <option className='text-black' value="market">Market</option>
          <option className='text-black' value="health">Health</option>
          <option className='text-black' value="education">Education</option>
        </select>
      </div>

      {/* Urgent News Section */}
      {urgentNews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
            🚨 Urgent News
          </h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            {urgentNews.map((article) => (
              <div key={article._id} className="mb-4 last:mb-0">
                <h3 className="text-lg font-bold text-red-800 mb-2">{article.title}</h3>
                <p className="text-red-700 mb-2">{article.summary}</p>
                <div className="flex justify-between items-center text-sm text-red-600">
                  <span>By {article.author} • {article.source}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <article key={article._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  article.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  article.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  article.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.summary}
              </p>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>By {article.author}</span>
                <span>{article.views} views</span>
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                Read Full Article
              </button>
            </div>
          </article>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No news articles found.</p>
        </div>
      )}
    </div>
  );
}
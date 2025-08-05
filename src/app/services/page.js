// src/app/services/page.js
"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        const data = await response.json();
        
        if (data.success) {
          setServices(data.data.services);
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, [category, searchTerm]);

  const handleAddToCart = (service) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    
    // Convert service to product format for cart
    const productForCart = {
      _id: service._id,
      name: service.name,
      price: service.price,
      discountPrice: service.discountPrice,
      images: service.images,
      stock: service.stock,
      type: service.type
    };
    
    addToCart(productForCart, 1);
    alert(`${service.name} added to cart!`);
  };

  if (loading) return (
    <div className="flex justify-center bg-white items-center min-h-screen">
      <div className="text-xl text-black">Loading services...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl text-red-600">Error: {error}</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
          <option className='text-black'  value="education">Education</option>
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Our Services</h1>
      
      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-black rounded-lg focus:outline-none text-black                    focus:ring-2 focus:ring-green-500"
        >
          <option className='text-black' value="all">All Categories</option>
          <option className='text-black' value="agriculture">Agriculture</option>
          <option className='text-black' value="healthcare">Healthcare</option>
          <option className='text-black' value="education">Education</option>
          <option className='text-black' value="transportation">Transportation</option>
          <option className='text-black' value="financial">Financial</option>
          <option className='text-black' value="other">Other</option>
        </select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {service.images && service.images[0] && (
              <img 
                src={service.images[0]} 
                alt={service.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {service.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Provider:</strong> {service.provider}
                </p>
                {service.contact?.phone && (
                  <p className="text-sm text-gray-500">
                    <strong>Phone:</strong> {service.contact.phone}
                  </p>
                )}
              </div>

              {service.features && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-3xl font-bold text-green-600">
                    ${service.discountPrice || service.price}
                  </span>
                  {service.discountPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${service.price}
                    </span>
                  )}
                  <span className="text-gray-500 ml-1">per service</span>
                </div>
                <div className="text-right">
                  <div className="text-yellow-500">
                    ★ {service.rating}/5
                  </div>
                  <div className={`text-sm ${
                    service.availability === 'available' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {service.availability}
                  </div>
                </div>
              </div>

              {/* Add to Cart Button for products */}
              {service.type === 'product' && (
                <button
                  onClick={() => handleAddToCart(service)}
                  className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  disabled={service.stock === 0}
                >
                  {service.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              )}
              
              {/* Book Service Button for services */}
              {service.type === 'service' && (
                <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Service
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
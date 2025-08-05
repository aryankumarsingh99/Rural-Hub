// src/app/products/page.js
"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  
  const { addToCart, getTotalItems } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category, priceRange, sortBy, featuredOnly]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = '/api/products?';
      
      if (category !== 'all') url += `category=${category}&`;
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
      if (featuredOnly) url += `featured=true&`;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-');
        url += `minPrice=${min}&maxPrice=${max}&`;
      }
      url += `sort=${sortBy}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      alert('Please login to add items to cart');
      router.push('/login');
      return;
    }
    
    addToCart(product, 1);
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
    message.innerHTML = `
      <div class="flex items-center">
        <span class="mr-2">✅</span>
        <span>${product.name} added to cart!</span>
      </div>
    `;
    document.body.appendChild(message);
    setTimeout(() => {
      if (document.body.contains(message)) {
        document.body.removeChild(message);
      }
    }, 3000);
  };

  return (
    <div className="container mx-auto bg-white px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">🛍️ Products</h1>
          <p className=" text-black mt-2">Fresh products from local farmers and providers</p>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <div className="text-green-600 font-medium">
              🛒 Cart: {getTotalItems()} items
            </div>
            <button
              onClick={() => router.push('/cart')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Cart
            </button>
          </div>
        )}
      </div>
      
      {/* Advanced Search & Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-black mb-4">🔍 Search & Filter Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              <option value="food">🍞 Food</option>
              <option value="groceries">🥬 Groceries</option>
              <option value="electronics">📱 Electronics</option>
              <option value="clothing">👕 Clothing</option>
              <option value="books">📚 Books</option>
              <option value="home-garden">🏡 Home & Garden</option>
              <option value="health">🏥 Health</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Prices</option>
              <option value="0-10">💵 $0 - $10</option>
              <option value="10-25">💴 $10 - $25</option>
              <option value="25-50">💶 $25 - $50</option>
              <option value="50-100">💷 $50 - $100</option>
              <option value="100-999999">💸 $100+</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="name">📝 Name (A-Z)</option>
              <option value="-name">📝 Name (Z-A)</option>
              <option value="price">💰 Price (Low to High)</option>
              <option value="-price">💰 Price (High to Low)</option>
              <option value="-rating">⭐ Rating (High to Low)</option>
              <option value="-createdAt">🆕 Newest First</option>
            </select>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">⭐ Featured Products Only</span>
          </label>
          
          <button
            onClick={() => {
              setSearchTerm('');
              setCategory('all');
              setPriceRange('all');
              setSortBy('name');
              setFeaturedOnly(false);
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline ml-4"
          >
            🔄 Clear All Filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {product.images && product.images[0] && (
                <div className="relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.isFeatured && (
                    <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                      ⭐ Featured
                    </span>
                  )}
                  {product.discountPrice && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      🏷️ Sale
                    </span>
                  )}
                </div>
              )}
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      ${product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {product.brand}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-3 text-sm">
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1">{product.rating}/5</span>
                  </div>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `📦 ${product.stock} in stock` : '❌ Out of stock'}
                  </span>
                </div>

                <button 
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0 || !user}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    product.stock === 0 || !user
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 shadow-md hover:shadow-lg'
                  }`}
                >
                  {!user ? '🔒 Login to Add to Cart' : 
                   product.stock === 0 ? '❌ Out of Stock' : 
                   '🛒 Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategory('all');
              setPriceRange('all');
              setFeaturedOnly(false);
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            🔄 View All Products
          </button>
        </div>
      )}
    </div>
  );
}
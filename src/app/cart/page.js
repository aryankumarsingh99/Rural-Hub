// src/app/cart/page.js
"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, createBooking, loading } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [notes, setNotes] = useState('');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your cart and place orders.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!deliveryAddress.street || !deliveryAddress.city) {
      alert('Please fill in delivery address');
      return;
    }

    setCheckoutLoading(true);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: item.type || 'product',
            image: item.image
          })),
          totalAmount: getTotalPrice() * 1.08, // Including tax
          deliveryAddress,
          notes
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Clear cart after successful order
        localStorage.removeItem(`cart_${user._id}`);
        
        alert('🎉 Order placed successfully!');
        router.push('/dashboard');
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const taxAmount = getTotalPrice() * 0.08;
  const totalWithTax = getTotalPrice() + taxAmount;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        🛒 Shopping Cart
        <span className="ml-3 text-lg text-gray-600 font-normal">
          ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart!</p>
            <button
              onClick={() => router.push('/products')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              🛍️ Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                🛍️ Cart Items
              </h2>
              
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4 shadow-sm"
                    />
                  )}
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                    <p className="text-green-600 font-bold text-xl">${item.price}</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.type || 'product'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      ➖
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    >
                      ➕
                    </button>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <p className="font-bold text-xl text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium mt-1 transition-colors"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                📋 Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-medium">Free 🚚</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">${totalWithTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  📍 Delivery Address
                </h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Street Address *"
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City *"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={deliveryAddress.zipCode}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, zipCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Order Notes */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  📝 Order Notes (Optional)
                </h3>
                <textarea
                  placeholder="Any special instructions for delivery..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading || !deliveryAddress.street || !deliveryAddress.city}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-medium text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
              >
                {checkoutLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  '🛒 Place Order'
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                * Required fields for delivery
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
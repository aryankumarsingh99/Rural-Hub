// src/components/dashboard/BookingsList.js
"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import axios from 'axios';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/bookings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📅</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h4>
          <p className="text-gray-600 mb-4">Start by booking one of our services</p>
          <Button variant="primary">
            Browse Services
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{booking.serviceName}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {booking.timeSlot}
                </div>
                <div>
                  <span className="font-medium">Service:</span> {booking.serviceType}
                </div>
                <div>
                  <span className="font-medium">Amount:</span> ${booking.totalAmount}
                </div>
              </div>

              {booking.notes && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Notes:</span> {booking.notes}
                </div>
              )}

              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {booking.status === 'pending' && (
                  <Button variant="danger" size="sm">
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default BookingsList;
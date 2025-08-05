// src/components/dashboard/WelcomeCard.js
"use client";
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';

const WelcomeCard = () => {
  const { user } = useAuth();

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {getCurrentTime()}, {user?.firstName}! 👋
          </h2>
          <p className="text-green-100">
            Welcome back to your Rural Hub dashboard
          </p>
        </div>
        <div className="text-6xl opacity-20">
          🌾
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold">5</div>
          <div className="text-sm text-green-100">Active Bookings</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-green-100">Products Ordered</div>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;
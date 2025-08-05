// src/app/api/bookings/route.js
import Booking from '@/models/Booking';
import Product from '@/models/Product';
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization) {
      return NextResponse.json({ success: false, error: 'Authorization required' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();

    const { items, totalAmount, deliveryAddress, notes } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items in cart' }, { status: 400 });
    }

    // Verify products and update stock for product types
    for (const item of items) {
      if (item.type === 'product') {
        const product = await Product.findById(item.productId);
        if (!product) {
          return NextResponse.json({ success: false, error: `Product ${item.name} not found` }, { status: 404 });
        }
        if (product.stock < item.quantity) {
          return NextResponse.json({ success: false, error: `Insufficient stock for ${item.name}` }, { status: 400 });
        }
        
        // Update product stock
        product.stock -= item.quantity;
        await product.save();
      }
    }

    const booking = new Booking({
      userId: decoded.userId,
      items,
      totalAmount,
      deliveryAddress,
      notes
    });

    await booking.save();
    await booking.populate('userId', 'firstName lastName email');

    return NextResponse.json({
      success: true,
      booking,
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const authorization = request.headers.get('authorization');
    if (!authorization) {
      return NextResponse.json({ success: false, error: 'Authorization required' }, { status: 401 });
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');

    const skip = (page - 1) * limit;
    
    let query = { userId: decoded.userId };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBookings = await Booking.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalBookings / limit),
          totalBookings,
          hasMore: page * limit < totalBookings
        }
      }
    });

  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
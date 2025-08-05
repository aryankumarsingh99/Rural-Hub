// src/app/api/contact/route.js
import Contact from '@/models/Contact';
import connectDB from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, phone, subject, message, category } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false,
          error: "Name, email, subject, and message are required" 
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Please provide a valid email address" 
        },
        { status: 400 }
      );
    }

    // Create contact submission
    const newContact = new Contact({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      category: category || 'general',
    });

    await newContact.save();

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
      data: {
        id: newContact._id,
        submittedAt: newContact.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to submit contact form. Please try again.",
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    // Get contacts with pagination
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalContacts = await Contact.countDocuments({});
    const totalPages = Math.ceil(totalContacts / limit);

    return NextResponse.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages,
          totalContacts,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Contacts fetch error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch contacts",
        details: error.message
      },
      { status: 500 }
    );
  }
}
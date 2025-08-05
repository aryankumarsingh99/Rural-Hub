// src/scripts/testApis.js
// Run this with: node --experimental-fetch src/scripts/testApis.js

const BASE_URL = 'http://localhost:3000/api';

async function testApis() {
  console.log('🧪 Testing APIs...\n');

  // Test Services API
  console.log('Testing Services API...');
  try {
    const servicesResponse = await fetch(`${BASE_URL}/services`);
    const servicesData = await servicesResponse.json();
    console.log('✅ Services API:', servicesData.success ? 'Working' : 'Failed');
    console.log('   Response:', servicesData.data?.services?.length || 0, 'services found\n');
  } catch (error) {
    console.log('❌ Services API: Failed -', error.message, '\n');
  }

  // Test Products API
  console.log('Testing Products API...');
  try {
    const productsResponse = await fetch(`${BASE_URL}/products`);
    const productsData = await productsResponse.json();
    console.log('✅ Products API:', productsData.success ? 'Working' : 'Failed');
    console.log('   Response:', productsData.data?.products?.length || 0, 'products found\n');
  } catch (error) {
    console.log('❌ Products API: Failed -', error.message, '\n');
  }

  // Test News API
  console.log('Testing News API...');
  try {
    const newsResponse = await fetch(`${BASE_URL}/news`);
    const newsData = await newsResponse.json();
    console.log('✅ News API:', newsData.success ? 'Working' : 'Failed');
    console.log('   Response:', newsData.data?.news?.length || 0, 'news articles found\n');
  } catch (error) {
    console.log('❌ News API: Failed -', error.message, '\n');
  }

  // Test Register API
  console.log('Testing Register API...');
  try {
    const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        phone: '1234567890'
      }),
    });
    const registerData = await registerResponse.json();
    console.log('✅ Register API:', registerData.success ? 'Working' : 'Failed');
    console.log('   Response:', registerData.message || registerData.error, '\n');
  } catch (error) {
    console.log('❌ Register API: Failed -', error.message, '\n');
  }

  // Test Contact API
  console.log('Testing Contact API...');
  try {
    const contactResponse = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Message',
        message: 'This is a test message',
        category: 'general'
      }),
    });
    const contactData = await contactResponse.json();
    console.log('✅ Contact API:', contactData.success ? 'Working' : 'Failed');
    console.log('   Response:', contactData.message || contactData.error, '\n');
  } catch (error) {
    console.log('❌ Contact API: Failed -', error.message, '\n');
  }

  console.log('🎉 API testing completed!');
}

testApis();
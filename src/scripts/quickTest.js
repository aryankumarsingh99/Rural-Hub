// src/scripts/quickTest.js
console.log('🚀 Starting API Health Check...\n');

const urls = [
  'http://localhost:3000/api/services',
  'http://localhost:3000/api/products', 
  'http://localhost:3000/api/news',
  'http://localhost:3000/api/contact'
];

urls.forEach(async (url, index) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`✅ ${url.split('/').pop()}: ${data.success ? 'OK' : 'Failed'}`);
  } catch (error) {
    console.log(`❌ ${url.split('/').pop()}: Failed`);
  }
  
  if (index === urls.length - 1) {
    console.log('\n🎉 Health check completed!');
  }
});
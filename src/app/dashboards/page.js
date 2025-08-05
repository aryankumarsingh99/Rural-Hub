// // src/app/dashboard/page.js
// "use client";
// import { useState, useEffect } from 'react';

// export default function Dashboard() {
//   const [services, setServices] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         // Fetch all data simultaneously
//         const [servicesRes, productsRes, newsRes] = await Promise.all([
//           fetch('/api/services?limit=3'),
//           fetch('/api/products?featured=true&limit=4'),
//           fetch('/api/news?limit=3')
//         ]);

//         const [servicesData, productsData, newsData] = await Promise.all([
//           servicesRes.json(),
//           productsRes.json(),
//           newsRes.json()
//         ]);

//         if (servicesData.success) setServices(servicesData.data.services);
//         if (productsData.success) setProducts(productsData.data.products);
//         if (newsData.success) setNews(newsData.data.news);

//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchAllData();
//   }, []);

//   if (loading) return <div className="p-8">Loading dashboard...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8">Rural Hub Dashboard</h1>
      
//       {/* Services Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-bold mb-6">Featured Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {services.slice(0, 3).map((service) => (
//             <div key={service._id} className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
//               <p className="text-gray-600 mb-4">{service.description}</p>
//               <span className="text-2xl font-bold text-green-600">${service.price}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Products Section */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {products.slice(0, 4).map((product) => (
//             <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
//               <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//               <span className="text-xl font-bold text-green-600">${product.price}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* News Section */}
//       <section>
//         <h2 className="text-2xl font-bold mb-6">Latest News</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {news.slice(0, 3).map((article) => (
//             <div key={article._id} className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
//               <p className="text-gray-600">{article.summary}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
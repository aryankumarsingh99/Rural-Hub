// // src/components/Navigation.js
// "use client";
// import Link from 'next/link';
// import { useState } from 'react';
// import { useAuth } from '@/context/AuthContext';

// export default function Navigation() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, logout, loading } = useAuth();

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Services', href: '/services' },
//     { name: 'Products', href: '/products' },
//     { name: 'News', href: '/news' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   const handleLogout = () => {
//     logout();
//     setIsOpen(false);
//   };

//   if (loading) {
//     return (
//       <nav className="bg-green-600 shadow-lg">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center py-4">
//             <Link href="/" className="text-white text-2xl font-bold">
//               Rural Hub
//             </Link>
//             <div className="text-white">Loading...</div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="bg-green-600 shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <Link href="/" className="text-white text-2xl font-bold">
//             Rural Hub
//           </Link>
          
//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-white hover:text-green-200 transition-colors"
//               >
//                 {item.name}
//               </Link>
//             ))}
            
//             {/* Auth Section */}
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <div className="flex items-center space-x-4">
//                   <span className="text-white">
//                     Hello, {user.firstName}!
//                   </span>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-2">
//                   <Link
//                     href="/login"
//                     className="text-white hover:text-green-200 transition-colors"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/register"
//                     className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors"
//                   >
//                     Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-white"
//           >
//             ☰
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden pb-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="block text-white py-2 hover:text-green-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}
            
//             {/* Mobile Auth Section */}
//             <div className="mt-4 pt-4 border-t border-green-500">
//               {user ? (
//                 <div>
//                   <div className="text-white mb-2">Hello, {user.firstName}!</div>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left text-white py-2 hover:text-green-200"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <Link
//                     href="/login"
//                     className="block text-white py-2 hover:text-green-200"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/register"
//                     className="block text-white py-2 hover:text-green-200"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     Register
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }
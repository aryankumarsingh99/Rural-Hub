import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Rural Hub',
  description: 'Your gateway to rural services and products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="pt-20">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

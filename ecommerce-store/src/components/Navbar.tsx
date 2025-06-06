'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { cartCount } = useCart();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.error('Login functionality is not implemented yet.');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo-StyleSphere.png" alt="StyleSphere Logo" width={40} height={40} />
            <span className="ml-3 text-2xl font-bold text-gray-800">StyleSphere</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-blue-600 relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </Link>
            <a href="#" onClick={handleLoginClick} className="text-gray-600 hover:text-blue-600">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 
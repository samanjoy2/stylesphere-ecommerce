'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">StyleSphere</h3>
            <p className="text-gray-400">
              Sustainable fashion for a better future. High-quality, ethically-made clothing and accessories.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
              <li className="mb-2"><Link href="/about" className="hover:text-gray-300 transition-colors">About Us</Link></li>
              <li className="mb-2"><Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} StyleSphere. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
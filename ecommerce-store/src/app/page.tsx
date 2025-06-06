'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <section className="relative h-[40vh] md:h-[60vh] w-full flex items-center justify-center text-center bg-black">
        <Image
          src="/banner-page.png"
          alt="StyleSphere Banner"
          layout="fill"
          objectFit="contain"
          className="z-0"
          priority
        />
        <div className="relative z-10 bg-black bg-opacity-40 p-8 rounded-lg">
          <h1 className="text-5xl font-extrabold text-white">Welcome to StyleSphere</h1>
          <p className="mt-4 text-xl">Discover the future of sustainable fashion.</p>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Our Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col group"
            >
              <Link href={`/products/${product.id}`} passHref className="flex-grow">
                <div className="relative h-64 w-full">
            <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    RM{product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
              <div className="px-6 pb-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { addToCart } = useCart();
  const id = params.id as string;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id)
        .then(setProduct)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8 md:flex">
          <div className="md:w-1/2">
            <div className="relative h-96 w-full">
              <Image
                loader={imageLoader}
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-600 mt-4 text-lg">{product.description}</p>
            <p className="text-3xl font-bold text-gray-900 mt-6">
              RM{product.price.toFixed(2)}
            </p>
            <div className="mt-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <Link href="/" className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Your Items</h2>
                <button onClick={clearCart} className="text-red-500 hover:text-red-700 font-semibold flex items-center gap-2">
                    <Trash2 size={20} /> Clear Cart
                </button>
              </div>
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden">
                      <Image loader={imageLoader} src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">RM{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <MinusCircle className="text-gray-500 hover:text-gray-700" />
                    </button>
                    <span className="text-gray-800 w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <PlusCircle className="text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                  <p className="font-bold text-gray-800 w-20 text-right">RM{(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="text-red-500 hover:text-red-700" />
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2 text-gray-800">
                    <span className="text-gray-600">Subtotal</span>
                    <span>RM{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-800">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4 text-gray-800">
                    <span>Total</span>
                    <span>RM{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => toast.error("Payment processing is not yet implemented.")}
                  className="w-full mt-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400"
                  disabled={totalPrice === 0}
                >
                  Pay Now
                </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 
import Navbar from '@/components/Navbar';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about our products, our mission, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <MapPin className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Office</h3>
                <p className="text-gray-600">123 Green Way<br/>Enviro City, EC 12345</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <Mail className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-600">hello@stylesphere.com</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <Phone className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-600">(123) 456-7890</p>
            </div>
        </div>
      </main>
    </div>
  );
} 
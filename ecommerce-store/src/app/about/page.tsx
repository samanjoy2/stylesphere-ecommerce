import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Story</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Redefining fashion by creating high-quality, timeless pieces that are kind to the planet.
          </p>
        </div>
        <div className="relative h-96 w-full max-w-5xl mx-auto my-12 rounded-lg shadow-xl overflow-hidden">
            <Image 
                src="/banner-page.png" // Re-using the banner for visual consistency
                alt="Our Commitment"
                layout="fill"
                objectFit="cover"
            />
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                    At StyleSphere, our mission is to lead the change towards a more sustainable fashion industry. We believe that style and sustainability can and should coexist. We are committed to using eco-friendly materials, ethical manufacturing processes, and creating durable clothing that you can love for years to come.
                </p>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Sustainability:</strong> Minimizing our environmental footprint is at the core of everything we do.</li>
                    <li><strong>Transparency:</strong> We believe in being open about our supply chain and our processes.</li>
                    <li><strong>Quality:</strong> We create premium garments designed to last, not to be replaced.</li>
                    <li><strong>Community:</strong> We aim to build a community of conscious consumers who value quality and sustainability.</li>
                </ul>
            </div>
        </div>
      </main>
    </div>
  );
} 
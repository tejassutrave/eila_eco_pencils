import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';
import EcoAssistantWidget from '@/components/EcoAssistantWidget';
import Footer from '@/components/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Eila Eco Pencils — Plantable Seed & Recycled Newspaper Pencils India',
  description: 'Shop 100% tree-free recycled newspaper pencils and plantable seed pencils embedded with organic herb & flower seeds. Eco-friendly stationery for schools & corporate gifting across India.',
  keywords: 'eco pencils, plantable seed pencils, recycled newspaper pencils, eco stationery india, sustainable corporate gifting',
  openGraph: {
    title: 'Eila Eco Pencils — Sustainable Stationery India',
    description: 'Transform waste into greenery with plantable seed pencils and tree-free newspaper pencils.',
    url: 'https://eilaecopencils.com',
    siteName: 'Eila Eco Pencils',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="bg-[#faf9f5] text-[#1a2e26] font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-[#2d6a4f] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <AuthModal />
            <main className="flex-1">{children}</main>
            <EcoAssistantWidget />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
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
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark`}>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="bg-emerald-950 text-emerald-50 font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-emerald-950">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

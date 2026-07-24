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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: 'Eila Eco Products — Plantable Seed & Recycled Newspaper Stationery',
  description: 'Shop 100% tree-free recycled newspaper pencils, plantable seed pens, handmade newspaper pouches, and customizable carry bags by Bilva Enterprise, Dharwad. Premium eco-stationery & corporate gifting.',
  keywords: 'eco products, plantable seed pencils, plantable pens, recycled newspaper pencils, newspaper pouches, paper carry bags, eco stationery india, sustainable corporate gifting, dharwad karnataka',
  icons: {
    icon: '/logo_leaf_transparent.png',
    shortcut: '/logo_leaf_transparent.png',
    apple: '/logo_leaf_transparent.png',
  },
  openGraph: {
    title: 'Eila Eco Products — Sustainable Stationery India',
    description: 'Transform waste into greenery with plantable seed pencils, seed pens, and eco-packaging.',
    url: 'https://eilaecoproducts.com',
    siteName: 'Eila Eco Products',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning={true}>
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

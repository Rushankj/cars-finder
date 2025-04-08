// src/app/layout.js
import './globals.css';
import { CarFinderProvider } from '../context/CarFinderContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Car Finder App',
  description: 'Find your perfect car with our Car Finder App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <CarFinderProvider>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </CarFinderProvider>
      </body>
    </html>
  );
}

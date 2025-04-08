// src/components/Navbar.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCarFinder } from '../context/CarFinderContext';
import { SunIcon, MoonIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const pathname = usePathname();
  const { wishlist, darkMode, toggleDarkMode } = useCarFinder();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`sticky top-0 z-10 bg-white dark:bg-gray-800 transition-all duration-200 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CarFinder</Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/wishlist" 
            className="relative p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
          >
            <HeartIcon className="h-6 w-6" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
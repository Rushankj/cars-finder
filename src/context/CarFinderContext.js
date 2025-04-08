// src/context/CarFinderContext.js
'use client';
import { createContext, useState, useContext, useEffect } from 'react';

const CarFinderContext = createContext();

export function CarFinderProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize data from localStorage on component mount
  useEffect(() => {
    // Initialize wishlist from localStorage
    const storedWishlist = localStorage.getItem('carfinder_wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage', error);
        setWishlist([]);
      }
    }
    
    // Initialize dark mode from localStorage or system preference
    const storedDarkMode = localStorage.getItem('carfinder_darkmode');
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true');
    } else {
      // Use system preference as fallback
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);
  
  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('carfinder_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Update localStorage and apply dark mode class when darkMode changes
  useEffect(() => {
    localStorage.setItem('carfinder_darkmode', darkMode);
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const addToWishlist = (car) => {
    setWishlist(prev => [...prev, car]);
  };
  
  const removeFromWishlist = (carId) => {
    setWishlist(prev => prev.filter(car => car.id !== carId));
  };
  
  const isInWishlist = (carId) => {
    return wishlist.some(car => car.id === carId);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  return (
    <CarFinderContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </CarFinderContext.Provider>
  );
}

export function useCarFinder() {
  return useContext(CarFinderContext);
}
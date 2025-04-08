// src/components/CarGrid.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCarFinder } from '../context/CarFinderContext';
import WishlistButton from './WishlistButton';
import { motion } from '../utils/motion';

export default function CarGrid({ cars }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useCarFinder();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car, index) => {
        const inWishlist = isInWishlist(car.id);
        
        return (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
          >
            <Link href={`/cars/${car.id}`} className="block relative h-48 bg-gray-200">
              <img 
                src={car.imageUrl || "/placeholder-car.jpg"} 
                alt={car.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 right-2">
                <WishlistButton 
                  isInWishlist={inWishlist} 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    inWishlist ? removeFromWishlist(car.id) : addToWishlist(car);
                  }} 
                />
              </div>
            </Link>
            
            <div className="p-4">
              <Link href={`/cars/${car.id}`} className="block">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition">{car.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{car.brand}</p>
                <p className="text-blue-600 font-bold mt-2">${car.price.toLocaleString()}</p>
              </Link>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <span>Fuel: {car.fuelType}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <span>Seats: {car.seatingCapacity}</span>
                </div>
              </div>
              
              <Link href={`/cars/${car.id}`}
                className="block w-full text-center mt-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
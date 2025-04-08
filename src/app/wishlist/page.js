// src/app/wishlist/page.js
'use client';
import { useState, useEffect } from 'react';
import { useCarFinder } from '../../context/CarFinderContext';
import CarGrid from '../../components/CarGrid';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist } = useCarFinder();
  
  if (wishlist.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Your Wishlist</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Your wishlist is empty</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Browse Cars
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Wishlist</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{wishlist.length} cars in your wishlist</p>
      <CarGrid cars={wishlist} />
    </div>
  );
}

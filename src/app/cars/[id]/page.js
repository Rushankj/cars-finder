// src/app/cars/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCarFinder } from '../../../context/CarFinderContext';
import Loading from '../../../components/Loading';
import ErrorDisplay from '../../../components/ErrorDisplay';
import WishlistButton from '../../../components/WishlistButton';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useCarFinder();
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cars/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car details');
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarDetails();
  }, [id]);
  
  if (loading) return <Loading />;
  if (error) return <ErrorDisplay message={error} />;
  if (!car) return <ErrorDisplay message="Car not found" />;
  
  const inWishlist = isInWishlist(car.id);
  
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to search
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-gray-200">
          <img 
            src={car.imageUrl || "/placeholder-car.jpg"} 
            alt={car.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <WishlistButton 
              isInWishlist={inWishlist} 
              onClick={handleWishlistToggle} 
              size="lg"
            />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{car.name}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">{car.brand}</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">${car.price.toLocaleString()}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
              <p className="font-medium text-gray-800 dark:text-white">{car.fuelType}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Seating Capacity</p>
              <p className="font-medium text-gray-800 dark:text-white">{car.seatingCapacity} People</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Transmission</p>
              <p className="font-medium text-gray-800 dark:text-white">{car.transmission}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Mileage</p>
              <p className="font-medium text-gray-800 dark:text-white">{car.mileage} km/l</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
              <p className="font-medium text-gray-800 dark:text-white">{car.year}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-500 dark:text-gray-400">Engine</p>
              <p className="font-medium text-gray-800 dark:text-white">{car.engine}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Description</h3>
            <p className="text-gray-600 dark:text-gray-300">{car.description}</p>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <button className="flex-1 mr-2 bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition">
              Contact Seller
            </button>
            <button 
              onClick={handleWishlistToggle}
              className={`flex-1 ml-2 py-3 px-4 rounded transition ${
                inWishlist 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
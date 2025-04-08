// src/components/FilterPanel.js
'use client';
import { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function FilterPanel({ filters, onFilterChange }) {
  const [brands, setBrands] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [seatingCapacities, setSeatingCapacities] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch these options from the API
    setBrands(['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Tesla']);
    setFuelTypes(['Petrol', 'Diesel', 'Electric', 'Hybrid']);
    setSeatingCapacities(['2', '4', '5', '7', '8']);
  }, []);
  
  const handleClearFilters = () => {
    onFilterChange('brand', '');
    onFilterChange('minPrice', '');
    onFilterChange('maxPrice', '');
    onFilterChange('fuelType', '');
    onFilterChange('seatingCapacity', '');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Filters</h2>
        <button 
          className="md:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
        </button>
      </div>
      
      <div className={`${isMobileOpen ? 'block' : 'hidden'} md:block space-y-4`}>
        {/* Brand Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange('brand', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        {/* Price Range Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>
        
        {/* Fuel Type Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Fuel Type
          </label>
          <select
            value={filters.fuelType}
            onChange={(e) => onFilterChange('fuelType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">All Types</option>
            {fuelTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        {/* Seating Capacity Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Seating Capacity
          </label>
          <select
            value={filters.seatingCapacity}
            onChange={(e) => onFilterChange('seatingCapacity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="">Any Capacity</option>
            {seatingCapacities.map(capacity => (
              <option key={capacity} value={capacity}>{capacity} People</option>
            ))}
          </select>
        </div>
        
        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
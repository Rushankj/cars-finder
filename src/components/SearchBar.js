// src/components/SearchBar.js
'use client';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full md:w-96">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search cars by name or brand..."
        className="w-full px-4 py-3 pl-10 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <button 
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
// src/components/SortOption.js
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export default function SortOption({ onSort, currentSort }) {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-600 dark:text-gray-300">Sort:</span>
      <select
        value={currentSort}
        onChange={(e) => onSort(e.target.value)}
        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        <option value="none">Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  );
}
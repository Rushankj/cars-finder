// src/components/ErrorDisplay.js
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ErrorDisplay({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-red-500 mb-4">
        <ExclamationTriangleIcon className="h-12 w-12" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Error</h2>
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}
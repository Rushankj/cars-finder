// src/components/WishlistButton.js
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function WishlistButton({ isInWishlist, onClick, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const IconComponent = isInWishlist ? HeartIconSolid : HeartIcon;
  
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full ${
        isInWishlist 
          ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
      } transition-colors`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <IconComponent className={sizeClasses[size]} />
    </button>
  );
}
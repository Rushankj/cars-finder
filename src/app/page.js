// src/app/page.js
'use client';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import CarGrid from '../components/CarGrid';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/ErrorDisplay';
import SortOption from '../components/SortOption';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  
  const carsPerPage = 10;

  // Fetch cars data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        // In a real app, you'd fetch from an API endpoint
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...cars];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => 
        car.name.toLowerCase().includes(query) || 
        car.brand.toLowerCase().includes(query)
      );
    }
    
    // Apply brand filter
    if (filters.brand) {
      result = result.filter(car => car.brand === filters.brand);
    }
    
    // Apply price range filter
    if (filters.minPrice) {
      result = result.filter(car => car.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      result = result.filter(car => car.price <= parseInt(filters.maxPrice));
    }
    
    // Apply fuel type filter
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }
    
    // Apply seating capacity filter
    if (filters.seatingCapacity) {
      result = result.filter(car => car.seatingCapacity === parseInt(filters.seatingCapacity));
    }
    
    // Apply sorting
    if (sortOrder === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredCars(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [cars, filters, searchQuery, sortOrder]);

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Find Your Perfect Car</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 dark:text-gray-300">
              {filteredCars.length} cars found
            </p>
            <SortOption onSort={handleSort} currentSort={sortOrder} />
          </div>
          
          {filteredCars.length > 0 ? (
            <>
              <CarGrid cars={currentCars} />
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </>
          ) : (
            <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-xl text-gray-600 dark:text-gray-300">No cars found matching your criteria</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => {
                  setFilters({
                    brand: '',
                    minPrice: '',
                    maxPrice: '',
                    fuelType: '',
                    seatingCapacity: ''
                  });
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
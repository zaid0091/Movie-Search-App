import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import { omdbApi } from '../services/omdbApi';
import { debounce } from '../utils/helpers';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Debounced search function
  const debouncedSearch = debounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await omdbApi.searchMovies(searchQuery);
      
      if (response.Response === 'True') {
        setResults(response.Search || []);
      } else {
        setResults([]);
        setError(response.Error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 500);

  // Handle search when query changes
  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  // Update URL when query changes
  useEffect(() => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError('');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Search Movies</h1>
          
          <div className="relative max-w-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full bg-gray-800 text-white rounded-full py-4 px-6 pl-12 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FiX className="text-xl" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            <SkeletonCard count={12} />
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-red-400 text-xl mb-2">⚠️</div>
            <p className="text-gray-400 text-lg">{error}</p>
            <p className="text-gray-500 mt-2">Try searching for something else</p>
          </motion.div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-gray-400 mb-4">
              Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {results.map((movie) => (
                <motion.div
                  key={movie.imdbID}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MovieCard movie={movie} size="small" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && results.length === 0 && query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </motion.div>
        )}

        {/* Initial State */}
        {!query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Search for Movies</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Find your favorite movies by title, actor, director, or genre
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Search;
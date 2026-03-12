import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MovieCard from './MovieCard';

function MovieRow({ title, movies, isLoading = false }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth + 100 // Leave some margin
        : scrollLeft + clientWidth - 100;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Loading...</h2>
        </div>
        <div className="relative">
          <div 
            ref={rowRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          >
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="w-48 h-72 bg-netflix-gray rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          className="text-2xl font-bold text-white hover:text-netflix-red transition-colors duration-200 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h2>
      </div>
      
      <div className="relative group">
        {/* Enhanced scroll buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/90 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-xl border border-white/20"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/90 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-xl border border-white/20"
        >
          <FiChevronRight className="text-2xl" />
        </button>

        {/* Movies container with enhanced spacing */}
        <div 
          ref={rowRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: 'none'
          }}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.imdbID}
              className="flex-shrink-0 snap-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>

        {/* Gradient overlays for scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-netflix-black to-transparent pointer-events-none opacity-50" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-netflix-black to-transparent pointer-events-none opacity-50" />
      </div>
    </div>
  );
}

export default MovieRow;
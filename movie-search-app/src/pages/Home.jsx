import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import SkeletonCard from '../components/SkeletonCard';
import Footer from '../components/Footer';
import { omdbApi } from '../services/omdbApi';
import { getRandomMovies } from '../utils/helpers';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API calls with timeout for demo
        setTimeout(async () => {
          // In a real app, you'd make actual API calls
          // const trendingData = await omdbApi.searchMovies('trending');
          // const popularData = await omdbApi.searchMovies('popular');
          // const actionData = await omdbApi.getMoviesByType('action');
          // const comedyData = await omdbApi.getMoviesByType('comedy');
          
          // For demo purposes, using sample data
          setTrendingMovies(getRandomMovies(10));
          setPopularMovies(getRandomMovies(10));
          setActionMovies(getRandomMovies(10));
          setComedyMovies(getRandomMovies(10));
          
          setLoading(false);
        }, 1500);
        
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-netflix-black">
      {/* Hero Banner */}
      <HeroBanner />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Trending Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MovieRow 
            title="Trending Now" 
            movies={trendingMovies} 
            isLoading={loading}
          />
        </motion.div>

        {/* Popular Movies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MovieRow 
            title="Popular on MovieFlix" 
            movies={popularMovies} 
            isLoading={loading}
          />
        </motion.div>

        {/* Action Movies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MovieRow 
            title="Action Movies" 
            movies={actionMovies} 
            isLoading={loading}
          />
        </motion.div>

        {/* Comedy Movies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MovieRow 
            title="Comedy Collection" 
            movies={comedyMovies} 
            isLoading={loading}
          />
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="mb-8">
                <div className="h-8 bg-netflix-gray rounded w-1/4 mb-6 animate-pulse" />
                <div className="flex space-x-4 overflow-hidden">
                  <SkeletonCard count={10} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiShare2, FiStar, FiCalendar, FiClock, FiUsers, FiExternalLink, FiX } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import { omdbApi } from '../services/omdbApi';
import { formatRuntime, formatRating, truncateText } from '../utils/helpers';
import { getRandomMovies } from '../utils/helpers';
import SkeletonCard from '../components/SkeletonCard';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isFavorited = isFavorite(id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from OMDb API first
        try {
          const cleanId = id.replace(/_\d+_\d+$/, ''); // Remove our suffix
          const response = await omdbApi.getMovieById(cleanId);
          
          if (response.Response === 'True') {
            setMovie(response);
            setError('');
            return;
          }
        } catch (apiError) {
          console.log('OMDb API failed, using sample data');
        }
        
        // Fallback to sample data if API fails
        const sampleMovies = getRandomMovies(1);
        const sampleMovie = sampleMovies[0];
        
        // Use the ID from URL but with sample data
        const fallbackMovie = {
          ...sampleMovie,
          imdbID: id,
          Title: sampleMovie.Title,
          Plot: "This is sample plot data for demonstration purposes. In a production app, this would come from the OMDb API with real movie information.",
          Director: "Sample Director",
          Writer: "Sample Writer",
          Actors: "Sample Actor 1, Sample Actor 2, Sample Actor 3",
          Genre: "Action, Drama, Thriller",
          Language: "English",
          Country: "USA",
          Awards: "Sample Awards",
          Metascore: "N/A",
          imdbRating: "8.5",
          imdbVotes: "100,000",
          Rated: "PG-13",
          Runtime: "120 min",
          Released: "01 Jan 2024",
          Year: sampleMovie.Year
        };
        
        setMovie(fallbackMovie);
        setError('');
        
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFromFavorites(id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleTrailer = () => {
    // Search for trailer on YouTube
    const trailerQuery = `${movie.Title} ${movie.Year} official trailer`;
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(trailerQuery)}`;
    window.open(youtubeUrl, '_blank');
  };

  const handleShare = async () => {
    const movieUrl = `${window.location.origin}/movie/${movie.imdbID}`;
    const shareText = `Check out ${movie.Title} (${movie.Year}) - ${movie.imdbRating}/10 on IMDb`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: movie.Title,
          text: shareText,
          url: movieUrl
        });
      } else {
        // Show modal for manual sharing
        setShowShareModal(true);
      }
    } catch (error) {
      console.log('Share failed:', error);
    }
  };

  const handleCopyLink = async () => {
    const movieUrl = `${window.location.origin}/movie/${movie.imdbID}`;
    try {
      await navigator.clipboard.writeText(movieUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleSocialShare = (platform) => {
    const movieUrl = `${window.location.origin}/movie/${movie.imdbID}`;
    const shareText = `Check out ${movie.Title} (${movie.Year}) - ${movie.imdbRating}/10 on IMDb`;
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(movieUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(movieUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(movieUrl)}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-netflix-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="w-full h-96 bg-netflix-gray rounded-lg animate-pulse" />
            </div>
            <div className="lg:w-2/3 space-y-6">
              <div className="h-12 bg-netflix-gray rounded w-3/4 animate-pulse" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-netflix-gray rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="pt-16 min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
          <p className="text-netflix-light-gray mb-6">{error || 'The movie you\'re looking for doesn\'t exist'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-netflix-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-netflix-black">
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-netflix-gray rounded-xl p-6 max-w-md w-full mx-4 border border-netflix-gray/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Share {movie.Title}</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-netflix-light-gray hover:text-white transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-netflix-black rounded-lg p-3">
                <input
                  type="text"
                  value={`${window.location.origin}/movie/${movie.imdbID}`}
                  readOnly
                  className="w-full bg-transparent text-white text-sm"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 bg-netflix-red text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  {shareCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Twitter
                </button>
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Facebook
                </button>
                <button
                  onClick={() => handleSocialShare('linkedin')}
                  className="flex-1 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.jpg'})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {movie.Title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-netflix-light-gray">
              <div className="flex items-center space-x-1">
                <FiStar className="text-yellow-400" />
                <span>{formatRating(movie.imdbRating)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiCalendar />
                <span>{movie.Year}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiClock />
                <span>{formatRuntime(movie.Runtime)}</span>
              </div>
              <span className="px-2 py-1 bg-netflix-gray rounded text-sm">
                {movie.Rated}
              </span>
            </div>
            
            <p className="text-lg text-netflix-light-gray mb-6 max-w-2xl">
              {truncateText(movie.Plot, 200)}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={handleTrailer}
                className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlay />
                <span>Watch Trailer</span>
                <FiExternalLink className="text-sm" />
              </motion.button>
              
              <motion.button
                onClick={handleFavoriteToggle}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                  isFavorited
                    ? 'bg-netflix-red text-white hover:bg-red-600'
                    : 'bg-netflix-gray text-white hover:bg-netflix-hover-gray'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFavorited ? <FiCheck /> : <FiPlus />}
                <span>{isFavorited ? 'Remove from List' : 'Add to List'}</span>
              </motion.button>
              
              <motion.button
                onClick={handleShare}
                className="flex items-center space-x-2 bg-netflix-gray text-white px-6 py-3 rounded-lg hover:bg-netflix-hover-gray transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShare2 />
                <span>Share</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Plot */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Storyline</h2>
              <p className="text-netflix-light-gray leading-relaxed">{movie.Plot}</p>
            </section>

            {/* Cast and Crew */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cast & Crew</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Director</h3>
                  <p className="text-netflix-light-gray">{movie.Director}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Writer</h3>
                  <p className="text-netflix-light-gray">{movie.Writer}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Actors</h3>
                  <p className="text-netflix-light-gray">{movie.Actors}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Genre</h3>
                  <p className="text-netflix-light-gray">{movie.Genre}</p>
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Technical Specs</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-netflix-gray p-4 rounded-lg border border-netflix-gray/50">
                  <div className="text-netflix-light-gray text-sm">Release Date</div>
                  <div className="text-white font-semibold">{movie.Released}</div>
                </div>
                <div className="bg-netflix-gray p-4 rounded-lg border border-netflix-gray/50">
                  <div className="text-netflix-light-gray text-sm">Runtime</div>
                  <div className="text-white font-semibold">{formatRuntime(movie.Runtime)}</div>
                </div>
                <div className="bg-netflix-gray p-4 rounded-lg border border-netflix-gray/50">
                  <div className="text-netflix-light-gray text-sm">Language</div>
                  <div className="text-white font-semibold">{movie.Language}</div>
                </div>
                <div className="bg-netflix-gray p-4 rounded-lg border border-netflix-gray/50">
                  <div className="text-netflix-light-gray text-sm">Country</div>
                  <div className="text-white font-semibold">{movie.Country}</div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Poster */}
            <div className="bg-netflix-gray rounded-lg p-6 border border-netflix-gray/50">
              <h3 className="text-xl font-bold text-white mb-4">Movie Poster</h3>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = '/placeholder-poster.jpg';
                }}
              />
            </div>

            {/* Ratings */}
            <div className="bg-netflix-gray rounded-lg p-6 border border-netflix-gray/50">
              <h3 className="text-xl font-bold text-white mb-4">Ratings</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-netflix-light-gray">IMDb</span>
                  <div className="flex items-center space-x-2">
                    <FiStar className="text-yellow-400" />
                    <span className="text-white font-semibold">{formatRating(movie.imdbRating)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-netflix-light-gray">Metascore</span>
                  <span className="text-white font-semibold">{movie.Metascore || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-netflix-light-gray">Votes</span>
                  <span className="text-white font-semibold">{movie.imdbVotes || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-netflix-gray rounded-lg p-6 border border-netflix-gray/50">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleTrailer}
                  className="w-full flex items-center justify-center space-x-2 bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  <FiPlay />
                  <span>Watch Trailer</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 bg-netflix-hover-gray text-white py-2 rounded-lg hover:bg-netflix-gray transition-colors font-medium"
                >
                  <FiShare2 />
                  <span>Share Movie</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
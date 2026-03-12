import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return;
    
    const loadFavorites = () => {
      try {
        // Try localStorage first, then sessionStorage as fallback
        let savedFavorites = localStorage.getItem('movieFavorites');
        if (!savedFavorites) {
          savedFavorites = sessionStorage.getItem('movieFavorites');
        }
        
        if (savedFavorites) {
          const parsedFavorites = JSON.parse(savedFavorites);
          
          // Validate that we have an array
          if (Array.isArray(parsedFavorites)) {
            setFavorites(parsedFavorites);
            setIsInitialLoad(false); // Mark initial load as complete
          } else {
            console.warn('Invalid favorites format, clearing storage');
            localStorage.removeItem('movieFavorites');
            sessionStorage.removeItem('movieFavorites');
            setIsInitialLoad(false);
          }
        } else {
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        // Clear corrupted data
        try {
          localStorage.removeItem('movieFavorites');
          sessionStorage.removeItem('movieFavorites');
        } catch (clearError) {
          console.error('Error clearing storage:', clearError);
        }
        setIsInitialLoad(false);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadFavorites, 100);
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to both storages whenever they change
  useEffect(() => {
    // Only access localStorage on client side and skip initial load
    if (typeof window === 'undefined' || isInitialLoad) return;
    
    const saveFavorites = () => {
      try {
        // Save to both localStorage and sessionStorage
        localStorage.setItem('movieFavorites', JSON.stringify(favorites));
        sessionStorage.setItem('movieFavorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    };

    saveFavorites();
  }, [favorites, isInitialLoad]);

  const addToFavorites = (movie) => {
    setFavorites(prev => {
      // Check if movie already exists
      if (prev.some(fav => fav.imdbID === movie.imdbID)) {
        showNotification(`${movie.Title} is already in your list!`, 'warning');
        return prev;
      }
      
      const newFavorites = [...prev, movie];
      showNotification(`${movie.Title} added to your list!`, 'success');
      return newFavorites;
    });
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites(prev => {
      const movieToRemove = prev.find(movie => movie.imdbID === imdbID);
      const newFavorites = prev.filter(movie => movie.imdbID !== imdbID);
      
      if (movieToRemove) {
        showNotification(`${movieToRemove.Title} removed from your list`, 'info');
      }
      
      return newFavorites;
    });
  };

  const isFavorite = (imdbID) => {
    return favorites.some(movie => movie.imdbID === imdbID);
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      notification
    }}>
      {children}
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </FavoritesContext.Provider>
  );
}

function Notification({ message, type, onClose }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600 border-green-500';
      case 'warning':
        return 'bg-yellow-600 border-yellow-500';
      case 'error':
        return 'bg-red-600 border-red-500';
      default:
        return 'bg-blue-600 border-blue-500';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-fadeIn">
      <div className={`${getTypeStyles()} border-l-4 text-white px-6 py-4 rounded-lg shadow-lg max-w-md`}>
        <div className="flex items-center justify-between">
          <span className="font-medium">{message}</span>
          <button 
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
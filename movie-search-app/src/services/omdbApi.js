import axios from 'axios';

const API_KEY = 'f7cab9e3'; // Replace with your actual OMDb API key
const BASE_URL = 'http://www.omdbapi.com/';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY
  }
});

export const omdbApi = {
  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get('', {
        params: {
          s: query,
          page: page,
          type: 'movie'
        }
      });
      return response.data;
    } catch (error) {
      console.log('API request failed, using sample data');
      throw error;
    }
  },

  // Get movie by ID
  getMovieById: async (id) => {
    try {
      const response = await api.get('', {
        params: {
          i: id,
          plot: 'full'
        }
      });
      return response.data;
    } catch (error) {
      console.log('API request failed, using sample data');
      throw error;
    }
  },

  // Get movies by genre/type (using search with type filters)
  getMoviesByType: async (type, page = 1) => {
    try {
      const typeMap = {
        'popular': 'popular',
        'top-rated': 'top',
        'action': 'action',
        'comedy': 'comedy',
        'drama': 'drama',
        'horror': 'horror',
        'romance': 'romance',
        'sci-fi': 'sci-fi'
      };

      const searchQuery = typeMap[type] || 'movie';
      
      const response = await api.get('', {
        params: {
          s: searchQuery,
          page: page,
          type: 'movie'
        }
      });
      return response.data;
    } catch (error) {
      console.log('API request failed, using sample data');
      throw error;
    }
  }
};

export default omdbApi;
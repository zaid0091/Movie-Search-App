// Format movie runtime
export const formatRuntime = (runtime) => {
  if (!runtime || runtime === 'N/A') return 'N/A';
  
  const minutes = parseInt(runtime);
  if (isNaN(minutes)) return runtime;
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

// Format movie rating
export const formatRating = (rating) => {
  if (!rating || rating === 'N/A') return 'N/A';
  return rating;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Get YouTube trailer URL (you'd need to implement actual trailer fetching)
export const getTrailerUrl = (movieTitle) => {
  // This is a placeholder - in a real app you'd integrate with YouTube Data API
  // or use a service that provides trailer URLs
  return `https://www.youtube.com/embed/dQw4w9WgXcQ`; // Placeholder
};

// Generate random movies for demo purposes with unique keys
export const getRandomMovies = (count = 10) => {
  const sampleMovies = [
    { Title: "The Shawshank Redemption", Year: "1994", imdbID: "tt0111161", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg" },
    { Title: "The Godfather", Year: "1972", imdbID: "tt0068646", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
    { Title: "The Dark Knight", Year: "2008", imdbID: "tt0468569", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
    { Title: "Pulp Fiction", Year: "1994", imdbID: "tt0110912", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
    { Title: "Forrest Gump", Year: "1994", imdbID: "tt0109830", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" },
    { Title: "Inception", Year: "2010", imdbID: "tt1375666", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
    { Title: "The Matrix", Year: "1999", imdbID: "tt0133093", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
    { Title: "Goodfellas", Year: "1990", imdbID: "tt0099685", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
    { Title: "The Lord of the Rings", Year: "2001", imdbID: "tt0120737", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg" },
    { Title: "Fight Club", Year: "1999", imdbID: "tt0137523", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg" }
  ];
  
  // Shuffle array and take unique movies
  const shuffled = [...sampleMovies].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, sampleMovies.length));
  
  // Add unique suffix to ensure no duplicate keys
  return selected.map((movie, index) => ({
    ...movie,
    imdbID: `${movie.imdbID}_${Date.now()}_${index}`
  }));
};
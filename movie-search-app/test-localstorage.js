// Simple localStorage test
// Run this in browser console to test localStorage functionality

console.log('Testing localStorage functionality...');

// Test 1: Check if localStorage is available
try {
  localStorage.setItem('test', 'value');
  const value = localStorage.getItem('test');
  console.log('✅ localStorage is available:', value);
  localStorage.removeItem('test');
} catch (error) {
  console.error('❌ localStorage is not available:', error);
}

// Test 2: Check movieFavorites data
try {
  const favorites = localStorage.getItem('movieFavorites');
  console.log('📦 Current movieFavorites:', favorites);
  
  if (favorites) {
    const parsed = JSON.parse(favorites);
    console.log('📋 Parsed favorites:', parsed);
    console.log('📊 Number of favorites:', parsed.length);
  } else {
    console.log('📋 No favorites found in localStorage');
  }
} catch (error) {
  console.error('❌ Error reading movieFavorites:', error);
}

// Test 3: Simulate adding a movie
try {
  const testMovie = {
    imdbID: 'tt1234567',
    Title: 'Test Movie',
    Year: '2023',
    Type: 'movie',
    Poster: 'https://example.com/poster.jpg'
  };
  
  const currentFavorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
  currentFavorites.push(testMovie);
  localStorage.setItem('movieFavorites', JSON.stringify(currentFavorites));
  
  console.log('✅ Test movie added to localStorage');
  
  // Verify it was saved
  const updated = JSON.parse(localStorage.getItem('movieFavorites'));
  console.log('📋 Updated favorites:', updated);
  
  // Clean up test data
  const cleaned = updated.filter(movie => movie.imdbID !== 'tt1234567');
  localStorage.setItem('movieFavorites', JSON.stringify(cleaned));
  console.log('🧹 Test data cleaned up');
  
} catch (error) {
  console.error('❌ Error testing movie addition:', error);
}

console.log('localStorage test completed!');

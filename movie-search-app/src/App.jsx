import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import MyList from './pages/MyList';
import NotFound from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

function AppContent() {
  useKeyboardNavigation();
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <AppContent />
      </Router>
    </FavoritesProvider>
  );
}

export default App;
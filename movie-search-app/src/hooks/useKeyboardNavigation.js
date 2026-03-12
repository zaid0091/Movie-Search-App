import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Global keyboard shortcuts
      switch (e.key) {
        case '/':
          // Focus search input
          e.preventDefault();
          const searchInput = document.querySelector('input[type="text"]');
          if (searchInput) {
            searchInput.focus();
          }
          break;
        
        case 'Escape':
          // Close modals or clear focus
          const activeElement = document.activeElement;
          if (activeElement && activeElement.blur) {
            activeElement.blur();
          }
          // Close any open dropdowns or menus
          const dropdowns = document.querySelectorAll('[data-dropdown-open="true"]');
          dropdowns.forEach(dropdown => {
            dropdown.setAttribute('data-dropdown-open', 'false');
          });
          break;
        
        case 'Home':
          // Navigate to home page
          e.preventDefault();
          navigate('/');
          break;
        
        case 's':
          // Navigate to search page (when Ctrl/Cmd is pressed)
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            navigate('/search');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}
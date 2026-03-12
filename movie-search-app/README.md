# 🎬 Ultimate Movie Search App

A Netflix-inspired movie discovery platform built with React, featuring a sleek dark-themed UI, advanced search capabilities, and personalized watchlists.

## 🌟 Features

### Core Functionality
- 🔍 **Powerful Search**: Real-time movie search with debounced queries
- 🎞 **Browse Collections**: Curated rows for trending, popular, and genre-specific movies
- 🎬 **Detailed Views**: Comprehensive movie pages with ratings, cast, and technical details
- ❤️ **Personal Watchlist**: Save and manage favorite movies with LocalStorage persistence
- 📱 **Fully Responsive**: Mobile-first design with breakpoints for all device sizes

### Advanced Features
- **Netflix-style Hover Effects**: Cards expand with play controls and ratings on hover
- **Animated Transitions**: Smooth page transitions and micro-interactions
- **Skeleton Loaders**: Professional loading states during data fetching
- **Keyboard Navigation**: Shortcuts for search (/), home (Home key), and escape
- **Smart Trailers**: Auto-play trailer previews on hover (demo implementation)

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **State Management**: React Context API
- **Data**: OMDb API (with sample data for demo)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-search-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with search
│   ├── HeroBanner.jsx      # Featured movie banner
│   ├── MovieRow.jsx        # Horizontal scrolling movie rows
│   ├── MovieCard.jsx       # Individual movie cards with hover effects
│   ├── AdvancedMovieCard.jsx # Enhanced card with trailer preview
│   ├── SkeletonCard.jsx    # Loading skeleton components
│   └── Footer.jsx          # Site footer
├── pages/
│   ├── Home.jsx           # Main landing page
│   ├── Search.jsx         # Search results page
│   ├── MovieDetails.jsx   # Individual movie details
│   ├── MyList.jsx         # User's watchlist
│   └── NotFound.jsx       # 404 error page
├── context/
│   └── FavoritesContext.jsx # Favorites state management
├── hooks/
│   └── useKeyboardNavigation.js # Keyboard shortcut handling
├── services/
│   └── omdbApi.js         # OMDb API integration
├── utils/
│   └── helpers.js         # Utility functions
└── styles/
    └── global.css         # Global styles
```

## 🔧 Configuration

### OMDb API Setup
To use real movie data:

1. Get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)
2. Update `src/services/omdbApi.js`:
```javascript
const API_KEY = 'YOUR_ACTUAL_API_KEY';
```

### Customization
- **Colors**: Modify Tailwind config in `tailwind.config.js`
- **Animations**: Adjust durations in component files
- **API Endpoints**: Update service files for different data sources

## 🎨 Design System

### Color Palette
- Primary Red: `#E50914`
- Background: `#141414`
- Card Background: `#181818`
- Text: `#FFFFFF`
- Secondary Text: `#B3B3B3`
- Borders: `#2F2F2F`

### Typography
- Headings: 40px, 28px, 22px
- Body: 16px
- Small: 14px

### Spacing Scale
- 4px, 8px, 16px, 24px, 32px, 48px, 64px

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

## 📱 Responsive Breakpoints

- Mobile: 0px - 640px
- Tablet: 641px - 1024px  
- Desktop: 1025px - 1280px
- Large: 1281px+

## ⌨️ Keyboard Shortcuts

- `/` - Focus search input
- `ESC` - Clear focus/close modals
- `Home` - Navigate to homepage
- `Ctrl/Cmd + S` - Go to search page

## 🧪 Testing

Run the development server and test:
- Search functionality
- Navigation between pages
- Add/remove from favorites
- Responsive design on different screen sizes
- Keyboard navigation

## 📈 Future Enhancements

- [ ] User authentication with Firebase
- [ ] Personalized recommendations
- [ ] Video playback integration
- [ ] Social sharing features
- [ ] Advanced filtering and sorting
- [ ] Dark/light theme toggle
- [ ] Progressive Web App support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. Feel free to use and modify for learning.

## 🙏 Acknowledgments

- Netflix for UI inspiration
- OMDb API for movie data
- React community for amazing tools and libraries

---
Built with ❤️ using React and modern web technologies
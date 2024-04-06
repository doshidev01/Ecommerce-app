import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import Navbar from './components/navbar/navbar';
import { Home } from './components/home/home';
import  { Cart }  from './components/cart/cart';
import { ShopContextProvider } from './context/shop-context';

// Initializing i18n for internationalization
i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: translationEN, 
      },
      es: {
        translation: translationES, 
      },
    },
    lng: navigator.language.split('-')[0], // Setting language based on user's browser language
    fallbackLng: 'en', // Fallback language if translation is not available
    interpolation: {
      escapeValue: false,
    },
  });

// App component
function App() {
  return (
    <div className="App">
      <ShopContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;

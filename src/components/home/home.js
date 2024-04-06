import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../product/product';
import { ShopContext } from '../../context/shop-context';
import "./home.css";
import "../product/product.css";

// Function to filter products based on search query
const getFilteredProducts = (query, products) => {
  if (!query) {
    return products; // Return all products if no query is provided
  }
  const lowerCaseQuery = query.toLowerCase();

  // Filter products based on title or category
  return products.filter(product => {
    return product.title.toLowerCase().startsWith(lowerCaseQuery) || 
    product.category.toLowerCase().startsWith(lowerCaseQuery);
  });
}

// Render Home component
export const Home = () => {
  const { t, i18n } = useTranslation();
  const { products } = useContext(ShopContext);

  // State for search query
  const [query, setQuery] = useState("");

  // State for sorting products
  const [sortBy, setSortBy] = useState("nameAsc");

  // Filter products based on search query
  const filteredProducts = getFilteredProducts(query, products);

  // Handler for sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handler for language change
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  // Function to sort products based on selected sorting option
  const sortProducts = (products, sortBy) => {
    switch (sortBy) {
      case 'nameAsc':
        return products.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'nameDesc':
        return products.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'priceHighLow':
        return products.slice().sort((a, b) => b.price - a.price);
      case 'priceLowHigh':
        return products.slice().sort((a, b) => a.price - b.price);
      case 'discountHighLow':
        return products.slice().sort((a, b) => b.discountPercentage - a.discountPercentage);
      default:
        return products;
    }
  };

  // Render loading message while products are being fetched
  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <div className="searchAndSortContainer">
        {/* Search bar */}
        <div className="searchBar">
          <input type="text" 
          placeholder={t('searchPlaceholder')}
          onChange={e => setQuery(e.target.value)} />
        </div>

         {/* Sorting dropdown */}
        <div className="sortDropdown">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="nameAsc">{t('sortBy.nameAsc')}</option>
            <option value="nameDesc">{t('sortBy.nameDesc')}</option>
            <option value="priceHighLow">{t('sortBy.priceHighLow')}</option>
            <option value="priceLowHigh">{t('sortBy.priceLowHigh')}</option>
            <option value="discountHighLow">{t('sortBy.discountHighLow')}</option>
          </select>
        </div>

        {/* Language dropdown */}
        <div className="languageDropdown">
          <select onChange={handleLanguageChange} defaultValue={i18n.language}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>
      
      {/* Display products */}
      <div className="products">
        {sortProducts(filteredProducts, sortBy).map((product) => (
            <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
   
  );
};

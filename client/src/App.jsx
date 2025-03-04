// src/App.js
import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';

const App = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Hämta produkter och kategorier
  useEffect(() => {
    // Hämta produkter från backend
    fetch('/api/product')
      .then(response => response.json())
      .then(data => setProduct(data));

    // Hämta kategorier från backend
    fetch('/api/category')  
      .then(response => response.json())
      .then(data => setCategory(data));
  }, []);

  // Hantera kategori-filtrering
  const handleCategorySelect = categoryId => {
    setSelectedCategory(categoryId);
    fetch(`/api/product?category=${categoryId}`)  
      .then(response => response.json())
      .then(data => setProduct(data));
  };

  // Filtrera produkter baserat på vald kategori
  const filteredProduct = selectedCategory
    ? product.filter(product => product.fk_categoryid === selectedCategory)
    : product;

  return (
    <div className="app">
      <CategoryFilter category={category} onCategorySelect={handleCategorySelect} />
      <ProductList product={filteredProduct} />
    </div>
  );
};

export default App;

import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import './CategoryPage.css';

const DeskNamePlates = () => {
  const [sortBy, setSortBy] = useState('popular');
  
  const products = useMemo(() => {
    return getProductsByCategory('desk-nameplates');
  }, []);

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    
    switch(sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
  }, [products, sortBy]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>Desk Name Plates</h1>
        <p>Professional desk name plates for offices and institutions</p>
      </div>

      <div className="category-filters">
        <select 
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popular">Sort by: Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {sortedProducts.length === 0 && (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default DeskNamePlates;
import React from 'react';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const Wallpapers = () => {
  const products = [
    { id: 21, name: "Spectrum Birch Clock", price: 2499, image: "/images/products/image1.jpg", popular: true },
    { id: 22, name: "Modern Geometric", price: 1999, image: "/images/products/image2.jpg" },
    { id: 23, name: "Floral Pattern", price: 1799, image: "/images/products/image3.jpg" },
    { id: 24, name: "Textured Brick", price: 2199, image: "/images/products/image4.jpg" },
    { id: 25, name: "Wooden Finish", price: 1899, image: "/images/products/image5.jpg" }
  ];

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>Wallpapers</h1>
        <p>Transform your walls with our premium wallpapers</p>
      </div>

      <div className="category-filters">
        <select className="filter-select">
          <option>Sort by: Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wallpapers;
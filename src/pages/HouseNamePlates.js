import React from 'react';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const HouseNamePlates = () => {
  const products = [
    { id: 1, name: "Futura (Matte Black)", price: 549, image: "/images/products/image1.jpg", popular: true },
    { id: 2, name: "Golden Portoro", price: 649, image: "/images/products/image2.jpg", popular: true },
    { id: 5, name: "Futura (Gold Stainless Steel)", price: 1099, image: "/images/products/image3.jpg", popular: true },
    { id: 6, name: "Futura (Matte White)", price: 549, image: "/images/products/image4.jpg", popular: true },
    { id: 8, name: "Barlow GST Board", price: 899, image: "/images/products/image5.jpg", popular: true },
    { id: 14, name: "Impasto Contemporary", price: 649, image: "/images/products/image6.jpg", popular: true },
    { id: 15, name: "Teddy on the Moon", price: 799, image: "/images/products/image7.jpg" },
    { id: 16, name: "Sameeksha Wooden", price: 899, image: "/images/products/image8.jpg" },
    { id: 17, name: "Khurana Cutout", price: 949, image: "/images/products/image1.jpg" },
    { id: 18, name: "Walnut Contemporary", price: 699, image: "/images/products/image10.jpg" },
    { id: 19, name: "Pink Flare Vyom", price: 849, image: "/images/products/image4.jpg" },
    { id: 20, name: "Football Fanatic", price: 799, image: "/images/products/image5.jpg" }
  ];

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>House Name Plates</h1>
        <p>Beautiful name plates for your home</p>
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

export default HouseNamePlates;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBolt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isWishlist, setIsWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsWishlist(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleClick = () => {
    if (product && product.id) {
      navigate(`/product/${product.id}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        style: {
          background: '#088178',
          color: '#fff',
        },
        icon: '🛒',
        duration: 2000
      });
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (product) {
      addToCart(product);
      toast.success('Redirecting to checkout...', {
        style: {
          background: '#ff8c42',
          color: '#fff',
        },
        icon: '⚡',
        duration: 2000
      });
      setTimeout(() => {
        navigate('/cart');
      }, 1000);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    const result = toggleWishlist(product);
    setIsWishlist(result);
  };

  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {product.popular && <span className="popular-badge">Popular</span>}
      
      <motion.button 
        className={`wishlist-card-btn ${isWishlist ? 'active' : ''}`}
        onClick={handleWishlist}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isWishlist ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {isWishlist ? <FaHeart /> : <FaRegHeart />}
      </motion.button>

      <div className="product-image">
        <img src={product.image} alt={product.name} />
       
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹ {product.price}</p>
        
        <div className="product-actions">
          <motion.button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart /> Cart
          </motion.button>
          
          <motion.button 
            className="buy-now-btn"
            onClick={handleBuyNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBolt /> Buy
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
};

export default ProductCard;
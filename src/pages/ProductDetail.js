import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useReviews } from '../context/ReviewContext';
import { 
  FaShoppingCart, 
  FaBolt,
  FaArrowLeft, 
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaEnvelope,
  FaPlay,
  FaCheckCircle,
  FaTruck,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaThumbsUp,
  FaCamera,
  FaUser,
  FaCalendarAlt,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById, getRelatedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { 
    getProductReviews, 
    getAverageRating, 
    getRatingCounts, 
    addReview,
    markHelpful 
  } = useReviews();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [customName, setCustomName] = useState('');
  const [customDesignation, setCustomDesignation] = useState('');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [showVideo, setShowVideo] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  
  // Review States
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    comment: '',
    images: []
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewImages, setReviewImages] = useState([]);

  // Get reviews for this product
  const productReviews = getProductReviews(id);
  const averageRating = getAverageRating(id);
  const ratingCounts = getRatingCounts(id);
  const totalReviews = productReviews.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    const foundProduct = getProductById(id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setCustomName(foundProduct.customization?.name?.defaultValue || '');
      setCustomDesignation(foundProduct.customization?.designation?.defaultValue || '');
      setSelectedSize(foundProduct.variants?.sizes?.[0]?.id || '');
      setSelectedStyle(foundProduct.variants?.styles?.[0]?.id || '');
      const related = getRelatedProducts(foundProduct);
      setRelatedProducts(related);
      setIsWishlist(isInWishlist(id));
    } else {
      setProduct(null);
    }
    
    setLoading(false);
  }, [id, isInWishlist]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        quantity,
        selectedSize,
        selectedStyle,
        customName,
        customDesignation
      };
      addToCart(cartItem);
      toast.success(`${product.name} added to cart!`, {
        icon: '🛒',
        style: {
          background: '#088178',
          color: '#fff',
        }
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const cartItem = {
        ...product,
        quantity,
        selectedSize,
        selectedStyle,
        customName,
        customDesignation
      };
      addToCart(cartItem);
      toast.success('Redirecting to checkout...', {
        icon: '⚡',
        style: {
          background: '#ff8c42',
          color: '#fff',
        }
      });
      navigate('/cart');
    }
  };

  const handleWishlist = () => {
    const result = toggleWishlist(product);
    setIsWishlist(result);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Review Handlers
  const handleOpenReviewModal = () => {
    setShowReviewModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    document.body.style.overflow = 'auto';
    setReviewForm({
      name: '',
      email: '',
      rating: 5,
      title: '',
      comment: '',
      images: []
    });
    setHoverRating(0);
    setReviewImages([]);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!reviewForm.name || !reviewForm.email || !reviewForm.comment) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(reviewForm.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      name: reviewForm.name,
      email: reviewForm.email,
      rating: reviewForm.rating,
      title: reviewForm.title || `${reviewForm.rating} Star Review`,
      comment: reviewForm.comment,
      images: reviewImages,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      verified: true,
      helpful: 0
    };

    addReview(id, newReview);
    handleCloseReviewModal();
    toast.success('Thank you for your review!');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (reviewImages.length + files.length > 5) {
      toast.error('You can only upload up to 5 images');
      return;
    }
    const newImages = files.map(file => URL.createObjectURL(file));
    setReviewImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setReviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const renderStars = (rating, interactive = false, size = 'medium') => {
    const stars = [];
    const starSize = size === 'large' ? 24 : 16;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${interactive ? 'interactive' : ''} ${i <= (hoverRating || reviewForm.rating || rating) ? 'filled' : ''}`}
          onClick={interactive ? () => setReviewForm({...reviewForm, rating: i}) : null}
          onMouseEnter={interactive ? () => setHoverRating(i) : null}
          onMouseLeave={interactive ? () => setHoverRating(0) : null}
          style={{ fontSize: starSize }}
        >
          {i <= (hoverRating || reviewForm.rating || rating) ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="error-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-message"
          >
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <div className="error-actions">
              <button className="btn-secondary" onClick={handleGoBack}>
                <FaArrowLeft /> Go Back
              </button>
              <button className="btn-primary" onClick={() => navigate('/')}>
                Browse Products
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="product-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button className="back-button" onClick={handleGoBack}>
        <FaArrowLeft /> Back
      </button>

      <div className="product-detail-container">
        {/* Left Column - Images */}
        <div className="product-images">
          <div className="main-image-container">
            <AnimatePresence mode="wait">
              {showVideo ? (
                <motion.div 
                  key="video"
                  className="video-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <video controls autoPlay={false}>
                    <source src={product.videoUrl || "/videos/placeholder.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button className="close-video" onClick={() => setShowVideo(false)}>×</button>
                </motion.div>
              ) : (
                <motion.div 
                  key="image"
                  className="main-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img 
                    src={product.images?.[selectedImage] || product.image} 
                    alt={product.name} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {product.hasVideo && !showVideo && (
              <button className="play-video-btn" onClick={() => setShowVideo(true)}>
                <FaPlay /> Watch Preview
              </button>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbnail-images">
              {product.images.map((img, index) => (
                <motion.div 
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedImage(index);
                    setShowVideo(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Product Info */}
        <div className="product-info">
          <div className="breadcrumb">
            {product.category?.replace('-', ' ')} / {product.subCategory}
          </div>

          <h1>{product.name}</h1>

          {/* Ratings Summary */}
          <div className="review-summary">
            <div className="stars">
              {renderStars(parseFloat(averageRating))}
            </div>
            <span className="review-count">
              {averageRating} ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          <div className="price-section">
            <span className="price-label">Price:</span>
            <span className="price-value">₹ {product.price}</span>
            {product.popular && <span className="popular-badge">Best Seller</span>}
          </div>

          <div className="shipping-info">
            <FaTruck className="icon" />
            <span>Free shipping across India • Estimated delivery 3-5 days</span>
          </div>

          {/* Size Selection */}
          {product.variants?.sizes && (
            <div className="variant-section">
              <h3>Select Size</h3>
              <div className="variant-options">
                {product.variants.sizes.map((size) => (
                  <label key={size.id} className="variant-option">
                    <input
                      type="radio"
                      name="size"
                      value={size.id}
                      checked={selectedSize === size.id}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    />
                    <span className="variant-name">{size.name}</span>
                    <span className="variant-dimensions">{size.dimensions}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Style Selection */}
          {product.variants?.styles && (
            <div className="variant-section">
              <h3>Select Style</h3>
              <div className="style-options">
                {product.variants.styles.map((style) => (
                  <label key={style.id} className="style-option">
                    <input
                      type="radio"
                      name="style"
                      value={style.id}
                      checked={selectedStyle === style.id}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                    />
                    <img src={style.image} alt={style.name} />
                    <span className="style-name">{style.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Customization */}
          {product.customization && (
            <div className="customization-section">
              <h3>Personalize Your Product</h3>
              {product.customization.name && (
                <div className="custom-field">
                  <label>{product.customization.name.label}</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    maxLength={product.customization.name.maxLength}
                    placeholder={product.customization.name.placeholder}
                  />
                  <span className="char-count">
                    {product.customization.name.maxLength - (customName?.length || 0)} characters left
                  </span>
                </div>
              )}

              {product.customization.designation && (
                <div className="custom-field">
                  <label>{product.customization.designation.label}</label>
                  <input
                    type="text"
                    value={customDesignation}
                    onChange={(e) => setCustomDesignation(e.target.value)}
                    maxLength={product.customization.designation.maxLength}
                    placeholder={product.customization.designation.placeholder}
                  />
                  <span className="char-count">
                    {product.customization.designation.maxLength - (customDesignation?.length || 0)} characters left
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="product-actions-section">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="action-buttons">
              <motion.button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaShoppingCart /> Add to Cart
              </motion.button>
              <motion.button 
                className="buy-now-btn"
                onClick={handleBuyNow}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaBolt /> Buy Now
              </motion.button>
            </div>
          </div>

          {/* Key Features */}
          {product.features && (
            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheckCircle className="feature-check" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Info Tabs */}
          <div className="info-tabs">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <p>{product.description || "Premium quality name plate crafted with attention to detail. Perfect for professional and personal use."}</p>
            )}
            {activeTab === 'specifications' && product.specifications && (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#1e293b', textTransform: 'capitalize' }}>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'shipping' && (
              <div>
                <p><strong>Free Shipping:</strong> All orders ship free across India</p>
                <p><strong>Delivery Time:</strong> 3-5 business days</p>
                <p><strong>Returns:</strong> 7-day easy returns</p>
                <p><strong>Tracking:</strong> Track your order via email/SMS</p>
              </div>
            )}
          </div>

          {/* Share and Wishlist */}
          <div className="share-section">
            <span>Share:</span>
            <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}>
              <FaFacebookF />
            </button>
            <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${product.name}`, '_blank')}>
              <FaTwitter />
            </button>
            <button onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${window.location.href}&media=${product.image}&description=${product.name}`, '_blank')}>
              <FaPinterestP />
            </button>
            <button onClick={() => window.location.href = `mailto:?subject=${product.name}&body=Check out this product: ${window.location.href}`}>
              <FaEnvelope />
            </button>
            <button onClick={handleShare}>
              <FaShare />
            </button>
            <button 
              className={`wishlist-btn ${isWishlist ? 'active' : ''}`} 
              onClick={handleWishlist}
            >
              {isWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      <section className="ratings-reviews-section">
        <h2>Ratings & Reviews</h2>
        
        <div className="reviews-summary">
          <div className="average-rating">
            <div className="rating-number">{averageRating}</div>
            <div className="rating-stars">
              {renderStars(parseFloat(averageRating), false, 'large')}
            </div>
            <div className="total-reviews">{totalReviews} total ratings</div>
          </div>

          <div className="rating-distribution">
            {[5,4,3,2,1].map(rating => (
              <div key={rating} className="rating-bar-row">
                <span className="rating-label">{rating} ★</span>
                <div className="rating-bar-container">
                  <div 
                    className="rating-bar-fill" 
                    style={{ 
                      width: totalReviews > 0 
                        ? `${(ratingCounts[rating] / totalReviews) * 100}%` 
                        : '0%' 
                    }}
                  ></div>
                </div>
                <span className="rating-count">{ratingCounts[rating]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="write-review-section">
          <h3>Share Your Experience</h3>
          <p>Help other customers make better decisions</p>
          <button className="write-review-btn" onClick={handleOpenReviewModal}>
            Write a Review
          </button>
        </div>

        {/* Customer Reviews */}
        <div className="customer-reviews">
          <h3>Customer Reviews</h3>
          
          {productReviews.length > 0 ? (
            <div className="reviews-list">
              {productReviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        <FaUser />
                      </div>
                      <div>
                        <h4>{review.name}</h4>
                        <div className="review-meta">
                          <span className="review-rating">
                            {renderStars(review.rating)}
                          </span>
                          <span className="review-date">
                            <FaCalendarAlt /> {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    {review.verified && (
                      <span className="verified-badge">
                        <FaCheck /> Verified Purchase
                      </span>
                    )}
                  </div>
                  
                  {review.title && (
                    <h5 className="review-title">{review.title}</h5>
                  )}
                  
                  <p className="review-comment">{review.comment}</p>
                  
                  {review.images && review.images.length > 0 && (
                    <div className="review-images">
                      {review.images.map((img, idx) => (
                        <img key={idx} src={img} alt={`Review ${idx + 1}`} />
                      ))}
                    </div>
                  )}
                  
                  <div className="review-footer">
                    <button 
                      className="helpful-btn"
                      onClick={() => markHelpful(id, review.id)}
                    >
                      <FaThumbsUp /> Helpful ({review.helpful || 0})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reviews">
              <img src="/images/no-reviews.svg" alt="No reviews" />
              <p>No reviews yet</p>
              <button className="write-review-btn" onClick={handleOpenReviewModal}>
                Be the first to write a review
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>You May Also Like</h2>
          <div className="products-grid">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Write Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div 
            className="review-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseReviewModal}
          >
            <motion.div 
              className="review-modal"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="review-modal-header">
                <h3>Write a Review</h3>
                <button className="close-modal" onClick={handleCloseReviewModal}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Email *</label>
                  <input
                    type="email"
                    value={reviewForm.email}
                    onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rating *</label>
                  <div className="rating-input">
                    {renderStars(reviewForm.rating, true, 'large')}
                  </div>
                </div>

                <div className="form-group">
                  <label>Review Title</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                    placeholder="Summarize your experience"
                  />
                </div>

                <div className="form-group">
                  <label>Your Review *</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    placeholder="Tell us about your experience with this product"
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Add Photos (Optional - Max 5)</label>
                  <div className="image-upload-area">
                    <input
                      type="file"
                      id="review-images"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="review-images" className="upload-btn">
                      <FaCamera /> Upload Photos
                    </label>
                    <p className="upload-info">{reviewImages.length}/5 images uploaded</p>
                  </div>
                  
                  {reviewImages.length > 0 && (
                    <div className="image-preview">
                      {reviewImages.map((img, index) => (
                        <div key={index} className="preview-item">
                          <img src={img} alt={`Preview ${index + 1}`} />
                          <button 
                            type="button"
                            className="remove-image"
                            onClick={() => removeImage(index)}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={handleCloseReviewModal}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-review-btn">
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetail;
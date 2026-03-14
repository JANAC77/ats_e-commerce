import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { saveOrder } from '../services/orderService';
import { 
  FaLock, 
  FaTruck, 
  FaCreditCard, 
  FaMapMarkerAlt, 
  FaUser,
  FaArrowLeft,
  FaMoneyBillWave,
  FaCheckCircle
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: 'KA',
    pincode: '',
    phone: '',
    saveInfo: false,
    textOffers: false,
    sameAsShipping: true,
    paymentMethod: 'razorpay',
    shippingMethod: 'standard'
  });

  const [discountCode, setDiscountCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [codAvailable, setCodAvailable] = useState(true);
  const [shippingCost, setShippingCost] = useState(0);

  // Check if COD is available
  useEffect(() => {
    const total = getCartTotal();
    setCodAvailable(total <= 5000);
  }, [getCartTotal]);

  // Update shipping cost
  useEffect(() => {
    setShippingCost(formData.shippingMethod === 'express' ? 100 : 0);
  }, [formData.shippingMethod]);

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDiscountApply = () => {
    if (!discountCode) {
      toast.error('Please enter a discount code');
      return;
    }
    
    toast.success('Discount applied successfully!');
    setDiscountCode('');
  };

  const validateForm = () => {
    if (!formData.email) {
      toast.error('Email is required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!formData.firstName) {
      toast.error('First name is required');
      return false;
    }
    if (!formData.lastName) {
      toast.error('Last name is required');
      return false;
    }
    if (!formData.address1) {
      toast.error('Address is required');
      return false;
    }
    if (!formData.city) {
      toast.error('City is required');
      return false;
    }
    if (!formData.pincode) {
      toast.error('PIN code is required');
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit PIN code');
      return false;
    }
    if (!formData.phone) {
      toast.error('Mobile number is required');
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  };

  const handleCashOnDelivery = () => {
    if (!codAvailable) {
      toast.error('Cash on Delivery is not available for orders above ₹5000');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (formData.paymentMethod === 'cod' && !handleCashOnDelivery()) return;

    setIsProcessing(true);

    try {
      const subtotal = getCartTotal();
      const total = subtotal + shippingCost;

      // 🔥 FIX: Remove undefined values from cart items
      const safeCartItems = cartItems.map(item => ({
        id: item.id || '',
        name: item.name || '',
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || '',
        selectedSize: item.selectedSize || '',
        customName: item.customName || '',
        customDesignation: item.customDesignation || ''
      }));

      // 🔥 FIX: Ensure all fields have values (no undefined)
      const orderData = {
        orderNumber: `ORD-${Date.now()}`,
        customer: {
          email: formData.email || '',
          name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
          phone: formData.phone || ''
        },
        shipping: {
          address1: formData.address1 || '',
          address2: formData.address2 || '',
          city: formData.city || '',
          state: formData.state || 'KA',
          pincode: formData.pincode || '',
          method: formData.shippingMethod || 'standard',
          cost: shippingCost || 0
        },
        items: safeCartItems,
        payment: {
          method: formData.paymentMethod || 'razorpay',
          status: formData.paymentMethod === 'cod' ? 'pending' : 'paid',
          subtotal: subtotal || 0,
          shipping: shippingCost || 0,
          total: total || 0
        },
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      console.log('📦 Saving order:', orderData);

      // Save order to Firebase
      const savedOrder = await saveOrder(orderData);
      
      toast.success('Order placed successfully!');
      clearCart();
      
      navigate('/order-confirmation', { 
        state: { orderId: savedOrder.id } 
      });

    } catch (error) {
      console.error('❌ Order failed:', error);
      toast.error(`Order failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const total = getCartTotal() + shippingCost;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form">
          <button className="back-to-cart" onClick={handleBackToCart}>
            <FaArrowLeft /> Back to Cart
          </button>

          <h1>Checkout</h1>
          
          <div className="contact-section">
            <h2><FaUser /> Contact</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="delivery-section">
            <h2><FaMapMarkerAlt /> Delivery</h2>
            
            <div className="name-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="address1"
              placeholder="Address Line 1"
              value={formData.address1}
              onChange={handleChange}
              required
            />
            
            <input
              type="text"
              name="address2"
              placeholder="Address Line 2 (optional)"
              value={formData.address2}
              onChange={handleChange}
            />

            <div className="location-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              
              <select name="state" value={formData.state} onChange={handleChange}>
                <option value="KA">Karnataka</option>
                <option value="MH">Maharashtra</option>
                <option value="DL">Delhi</option>
                <option value="TN">Tamil Nadu</option>
              </select>
              
              <input
                type="text"
                name="pincode"
                placeholder="PIN code"
                value={formData.pincode}
                onChange={handleChange}
                required
                maxLength="6"
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="10-digit Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength="10"
            />
          </div>

          <div className="shipping-section">
            <h2><FaTruck /> Shipping method</h2>
            <div className="shipping-options">
              <label className="shipping-option">
                <input 
                  type="radio" 
                  name="shippingMethod" 
                  value="standard"
                  checked={formData.shippingMethod === 'standard'}
                  onChange={handleChange}
                />
                <div className="shipping-details">
                  <span className="shipping-name">Standard Shipping</span>
                  <span className="shipping-time">3-5 business days</span>
                </div>
                <span className="shipping-price">Free</span>
              </label>
              
              <label className="shipping-option">
                <input 
                  type="radio" 
                  name="shippingMethod" 
                  value="express"
                  checked={formData.shippingMethod === 'express'}
                  onChange={handleChange}
                />
                <div className="shipping-details">
                  <span className="shipping-name">Express Shipping</span>
                  <span className="shipping-time">1-2 business days</span>
                </div>
                <span className="shipping-price">₹100</span>
              </label>
            </div>
          </div>

          <div className="payment-section">
            <h2><FaCreditCard /> Payment</h2>

            <div className="payment-methods">
              <label className={`payment-option ${formData.paymentMethod === 'razorpay' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={formData.paymentMethod === 'razorpay'}
                  onChange={handleChange}
                />
                <div className="payment-details">
                  <span className="payment-name">
                    <MdPayment className="payment-icon" /> Razorpay
                  </span>
                </div>
              </label>

              <label className={`payment-option cod-option ${formData.paymentMethod === 'cod' ? 'selected' : ''} ${!codAvailable ? 'disabled' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  disabled={!codAvailable}
                />
                <div className="payment-details">
                  <span className="payment-name">
                    <FaMoneyBillWave className="payment-icon" /> Cash on Delivery
                  </span>
                </div>
              </label>
            </div>
          </div>

          <button 
            className={`submit-order ${formData.paymentMethod === 'cod' ? 'cod-submit' : ''}`}
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${total}`}
          </button>

          <div className="security-footer">
            <FaLock className="security-icon" />
            <span>Your information is secure</span>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order summary</h2>
          
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <img 
                  src={item.image || '/images/placeholder.jpg'} 
                  alt={item.name || 'Product'} 
                  onError={(e) => { e.target.src = '/images/placeholder.jpg' }}
                />
                <div className="item-details">
                  <h4>{item.name || 'Product'}</h4>
                  <p>Qty: {item.quantity || 1}</p>
                </div>
                <span className="item-price">₹{(item.price || 0) * (item.quantity || 1)}</span>
              </div>
            ))}
          </div>

          <div className="discount-section">
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={handleDiscountApply}>Apply</button>
          </div>

          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal ({getCartCount()} items)</span>
              <span>₹{getCartTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
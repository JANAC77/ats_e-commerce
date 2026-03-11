import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
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
  const { addOrder } = useOrders();
  
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
    
    // Simulate discount validation
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
      // Calculate totals
      const subtotal = getCartTotal();
      const total = subtotal + shippingCost;

      // Prepare order data
      const orderData = {
        orderNumber: `HOUSENAMA-${Date.now()}`,
        customer: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        },
        shipping: {
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          method: formData.shippingMethod,
          cost: shippingCost
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          selectedSize: item.selectedSize,
          selectedStyle: item.selectedStyle,
          customName: item.customName,
          customDesignation: item.customDesignation
        })),
        payment: {
          method: formData.paymentMethod,
          status: formData.paymentMethod === 'cod' ? 'pending' : 'paid',
          subtotal: subtotal,
          shipping: shippingCost,
          total: total,
          discount: 0
        },
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Add order to orders context
      const newOrder = addOrder(orderData);

      // Show success message
      if (formData.paymentMethod === 'cod') {
        toast.success(
          <div>
            <strong>Order placed successfully!</strong>
            <br />
            <small>Order ID: {newOrder.id}</small>
            <br />
            <small>Pay ₹{total} at delivery</small>
          </div>,
          { duration: 6000, icon: '🚚' }
        );
      } else {
        toast.success(
          <div>
            <strong>Payment successful!</strong>
            <br />
            <small>Order ID: {newOrder.id}</small>
          </div>,
          { duration: 6000, icon: '✅' }
        );
      }

      // Clear cart
      clearCart();
      
      // Redirect to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          orderId: newOrder.id,
          fromCheckout: true 
        } 
      });

    } catch (error) {
      console.error('Order failed:', error);
      toast.error('Order failed. Please try again.');
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
        {/* Left Column - Forms */}
        <div className="checkout-form">
          <button className="back-to-cart" onClick={handleBackToCart}>
            <FaArrowLeft /> Back to Cart
          </button>

          <h1>Housenama Checkout</h1>
          
          {/* Contact Section */}
          <div className="contact-section">
            <h2>
              <FaUser /> Contact
            </h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="checkbox">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
              />
              Email me with news and offers
            </label>
          </div>

          {/* Delivery Section */}
          <div className="delivery-section">
            <h2>
              <FaMapMarkerAlt /> Delivery
            </h2>
            
            <select name="country" defaultValue="IN">
              <option value="IN">India</option>
            </select>

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
                <option value="GJ">Gujarat</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="WB">West Bengal</option>
                <option value="TS">Telangana</option>
                <option value="AP">Andhra Pradesh</option>
                <option value="RJ">Rajasthan</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="HR">Haryana</option>
                <option value="PB">Punjab</option>
                <option value="KL">Kerala</option>
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

            <label className="checkbox">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleChange}
              />
              Save this information for next time
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                name="textOffers"
                checked={formData.textOffers}
                onChange={handleChange}
              />
              Text me with news and offers
            </label>
          </div>

          {/* Shipping Method Section */}
          <div className="shipping-section">
            <h2>
              <FaTruck /> Shipping method
            </h2>
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

          {/* Payment Section */}
          <div className="payment-section">
            <h2>
              <FaCreditCard /> Payment
            </h2>
            <p className="secure-note">All transactions are secure and encrypted.</p>

            <div className="payment-methods">
              {/* Razorpay Option */}
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
                    <MdPayment className="payment-icon" /> Razorpay Secure
                  </span>
                  <span className="payment-description">Pay via UPI, Cards, Net Banking, Wallets</span>
                  <div className="payment-badges">
                    <span className="payment-badge">UPI</span>
                    <span className="payment-badge">Visa</span>
                    <span className="payment-badge">Mastercard</span>
                    <span className="payment-badge">RuPay</span>
                  </div>
                </div>
              </label>

              {/* Cash on Delivery Option */}
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
                  <span className="payment-description">Pay with cash when you receive your order</span>
                  {!codAvailable ? (
                    <span className="cod-unavailable">
                      Not available for orders above ₹5000
                    </span>
                  ) : (
                    <div className="cod-features">
                      <span className="cod-feature">
                        <FaCheckCircle /> No extra charges
                      </span>
                      <span className="cod-feature">
                        <FaCheckCircle /> Pay after delivery
                      </span>
                    </div>
                  )}
                </div>
              </label>

              {/* Payment Note */}
              {formData.paymentMethod === 'razorpay' ? (
                <p className="payment-note">
                  You'll be redirected to Razorpay Secure to complete your purchase.
                </p>
              ) : (
                <p className="payment-note cod-note">
                  Pay ₹{total} in cash at your doorstep
                </p>
              )}
            </div>
          </div>

          {/* Billing Section */}
          <div className="billing-section">
            <h2>Billing address</h2>
            
            <label className="checkbox">
              <input
                type="checkbox"
                name="sameAsShipping"
                checked={formData.sameAsShipping}
                onChange={handleChange}
              />
              Same as shipping address
            </label>
          </div>

          {/* Submit Button */}
          <button 
            className={`submit-order ${formData.paymentMethod === 'cod' ? 'cod-submit' : ''}`}
            onClick={handleSubmit}
            disabled={isProcessing || (formData.paymentMethod === 'cod' && !codAvailable)}
          >
            {isProcessing ? (
              'Processing...'
            ) : formData.paymentMethod === 'cod' ? (
              <>
                <FaMoneyBillWave /> Confirm COD Order (₹{total})
              </>
            ) : (
              <>
                <FaCreditCard /> Proceed to Pay ₹{total}
              </>
            )}
          </button>

          {/* Security Note */}
          <div className="security-footer">
            <FaLock className="security-icon" />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-summary">
          <h2>Order summary</h2>
          
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  {item.selectedSize && (
                    <p>Size: {item.selectedSize}</p>
                  )}
                  {item.customName && (
                    <p>Name: {item.customName}</p>
                  )}
                </div>
                <span className="item-price">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Discount Section */}
          <div className="discount-section">
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={handleDiscountApply}>Apply</button>
          </div>

          {/* Summary Details */}
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
            <p className="tax-note">Including GST</p>
          </div>

          {/* COD Notice */}
          {formData.paymentMethod === 'cod' && (
            <div className="cod-notice">
              <h4>📝 COD Information:</h4>
              <ul>
                <li>Keep exact change ready</li>
                <li>Delivery in 3-5 business days</li>
                <li>You'll receive a confirmation call</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
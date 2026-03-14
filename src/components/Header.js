import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  FaShoppingBag, 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus, 
  FaClipboardList,
  FaHeart,
  FaSignOutAlt
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirebase } from '../context/FirebaseContext';
import toast from 'react-hot-toast';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  
  // Firebase hooks
  const { user, logout } = useFirebase();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();
  
  // Check if user is logged in from Firebase
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    closeMenu();
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      toast.success('Logged out successfully', {
        icon: '👋',
        style: {
          background: '#088178',
          color: '#fff',
        }
      });
      navigate('/');
    } catch (error) {
      // Error handled in Firebase context
    }
  };

  const handleOrders = () => {
    if (!isLoggedIn) {
      toast.error('Please login to view your orders');
      handleNavigation('/login');
    } else {
      handleNavigation('/orders');
    }
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      toast.error('Please login to view your wishlist');
      handleNavigation('/login');
    } else {
      handleNavigation('/wishlist');
    }
  };

  return (
    <header id="header">  {/* Changed from section to header */}
      <Link to="/" onClick={closeMenu}>
        <img src="/images/afs1.jpeg" className="logo" alt="AFS" />
      </Link>

      <div className="mobile-menu-btn" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul id="navbar" className={menuOpen ? 'active' : ''}>
        <li>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/desk-nameplates" onClick={closeMenu}>Desk</NavLink>
        </li>
        <li>
          <NavLink to="/house-nameplates" onClick={closeMenu}>House</NavLink>
        </li>
        <li>
          <NavLink to="/wallpapers" onClick={closeMenu}>Wallpapers</NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </li>
        
        {/* Account Dropdown */}
        <li className="dropdown-container" ref={dropdownRef}>
          <button className="account-btn" onClick={toggleDropdown}>
            <FaUser className="account-icon" />
            <span className="account-text">Account</span>
          </button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div 
                className="dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {!isLoggedIn ? (
                  // Guest menu
                  <>
                    <div className="dropdown-item" onClick={() => handleNavigation('/login')}>
                      <FaSignInAlt className="dropdown-icon" />
                      <span>Sign In</span>
                    </div>
                    
                    <div className="dropdown-item" onClick={() => handleNavigation('/register')}>
                      <FaUserPlus className="dropdown-icon" />
                      <span>Sign Up</span>
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    
                    <div className="dropdown-item" onClick={handleOrders}>
                      <FaClipboardList className="dropdown-icon" />
                      <span>My Orders</span>
                    </div>

                    <div className="dropdown-item" onClick={handleWishlist}>
                      <FaHeart className="dropdown-icon" />
                      <span>Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="dropdown-badge">{wishlistCount}</span>
                      )}
                    </div>
                  </>
                ) : (
                  // Logged in user menu
                  <>
                    <div className="dropdown-item" onClick={handleOrders}>
                      <FaClipboardList className="dropdown-icon" />
                      <span>My Orders</span>
                    </div>
                    
                    <div className="dropdown-item" onClick={handleWishlist}>
                      <FaHeart className="dropdown-icon" />
                      <span>Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="dropdown-badge">{wishlistCount}</span>
                      )}
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    
                    <div className="dropdown-item" onClick={handleLogout}>
                      <FaSignOutAlt className="dropdown-icon" />
                      <span>Logout</span>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </li> 

        {/* Cart Icon */}
        <li>
          <NavLink to="/cart" className="cart-icon" onClick={closeMenu}>
            <FaShoppingBag />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
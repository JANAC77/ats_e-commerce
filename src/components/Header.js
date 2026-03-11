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
import toast from 'react-hot-toast';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <section id="header">
      <Link to="/" onClick={closeMenu}>
        <img src="/images/AFS.jpeg" className="logo" alt="AFS" />
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
            <FaUser /> Account
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
                    
                    <div className="dropdown-item" onClick={() => handleNavigation('/orders')}>
                      <FaClipboardList className="dropdown-icon" />
                      <span>My Orders</span>
                    </div>

                    <div className="dropdown-item" onClick={() => handleNavigation('/wishlist')}>
                      <FaHeart className="dropdown-icon" />
                      <span>Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="dropdown-badge">{wishlistCount}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dropdown-item" onClick={() => handleNavigation('/orders')}>
                      <FaClipboardList className="dropdown-icon" />
                      <span>My Orders</span>
                    </div>
                    
                    <div className="dropdown-item" onClick={() => handleNavigation('/wishlist')}>
                      <FaHeart className="dropdown-icon" />
                      <span>Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="dropdown-badge">{wishlistCount}</span>
                      )}
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    
                    <div className="dropdown-item logout" onClick={handleLogout}>
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
    </section>
  );
};

export default Header;
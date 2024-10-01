
import React, { useState } from 'react';
import '../Header/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    navigate('/SignIn');
  };
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className='container header'>
        <div className="product-header">
          <div className='header-logo'>
            <b>DreamDestinations </b>
          </div>
          <div className='filter'>
            <div>
              <FontAwesomeIcon className='bars-icon' icon={faBars} onClick={toggleMenu} />
              {isMenuOpen && (
                <div className="bars">
                  <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/Map'>Map</Link></li>
                    <li><Link to='/TourPackage'>Tours</Link></li>
                    <li><Link to='/Wishlist'>Wishlist <sup>{wishlistCount}</sup> </Link></li>
                    <li><Link to='/CarRentals'>Car Rentals</Link></li>
                    <li><Link to='/Flights'>Flights</Link></li>
                    <li><Link to='/SignIn'>Register</Link></li>
                    <li>  <Link to='/Logout' onClick={handleLogout}>
                      Logout
                    </Link></li>
                  </ul>
                </div>
              )}
            </div>
            <Link to='/'>Home</Link>
            <Link to='/Map'>Map</Link>
            <Link to='/TourPackage'>Tours</Link>
            <Link to='/Wishlist'>Wishlist <sup>{wishlistCount}</sup> </Link>
            <Link to='/CarRentals'>CarRentals</Link>
            <Link to='/Flights'>Flights</Link>
            <Link to='/SignIn'>Register</Link>
            <Link onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

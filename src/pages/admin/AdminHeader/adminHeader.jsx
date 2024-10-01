
import React from 'react';
import '../AdminHeader/adminHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header>
      <div className='container header'>
        <div className="header-admin">
         
          <div className='filter'>
            <Link to='/'>Home</Link>
            <Link to='/admin/flightsReserv'>Flights-Reservation</Link>
            <Link to='/admin/TourReservation'>Tour-Reservation</Link>
            <Link to='/admin/CarReservation'>Car-Reservation</Link>
          
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, {useEffect, useRef} from 'react'
import '../MainComponents/mainComponents.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const Slider = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, {
      threshold: 0.1
    });

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) observer.unobserve(sectionElement);
    };
  }, []);

  return (
    <div ref={sectionRef} className="reveal">
    
      <div className="slider-container">
        <h3 className="slider-subtitle">Main Categories</h3>
       
        <div className="slider row">
          <div className="slide col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
            <img src="https://t4.ftcdn.net/jpg/07/94/41/01/360_F_794410140_nKJ9wHrHbyCUFhxGweKSXmUzEB1rDYyL.jpg" alt="Walking" />
            <h4>Register</h4>
            <Link className='link' to='/SignIn'><p>See More</p></Link> 
          </div>
          
          <div className="slide col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
            <img src="https://c4.wallpaperflare.com/wallpaper/106/90/394/road-sunset-the-city-lights-wallpaper-preview.jpg" alt="Hiking" />
            <h4>Tour Package</h4>
            <Link className='link' to='/TourPackage'><p>See More</p></Link> 
          </div>
          <div className="slide col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
            <img src="https://wallpapercave.com/wp/wp13008365.jpg" alt="Airbirds" />
            <h4>Car Rentals</h4>
            <Link className='link' to='/CarRentals'><p>See More</p></Link> 
          </div>
          <div className="slide col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
            <img src="https://png.pngtree.com/thumb_back/fh260/background/20230721/pngtree-d-render-of-a-lavish-private-jet-stationed-on-runway-with-image_3726117.jpg" alt="Wildlife" />
            <h4>Ticket</h4>
           <Link className='link' to='/Flights'><p>See More</p></Link> 
          </div>
        </div>
      </div>


    </div>
  );

  
  };
  
  export default Slider;
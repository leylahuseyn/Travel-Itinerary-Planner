import React from 'react'
import '../Footer/footer.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faInstagram, faTwitter, faLinkedinIn, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
  
  return (
    
    <div className='footer-baccol'>
    <div className='footer container'>
      <div className='row'>
      <div className='footer-name col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12'>
        <img className='footer-logo' src="https://www.pngall.com/wp-content/uploads/8/World-Travel.png" alt="" /><b> Travel</b>
        <p>Rapidiously myocardinate cross-pal capital model. Appropriately create interactive infrastructures</p>
        <div className='d-flex footer-icons'>
            <div className='icon'>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faFacebookF} /></a>
            </div>
            <div className='icon'>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faTwitter} /></a>
            </div>
            <div className='icon'>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <div className='icon'>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faWhatsapp} /></a>
            </div>
            <div className='icon'>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faInstagram} /></a>
            </div>
        </div>
      </div>
      <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 quick'>
        <b>Quick Links</b>
        <div className='links'>
       <p className='mt-3'> <Link className='Link mt-5' to='/'> - Home</Link></p> 
          <p> <Link className='Link'  to='/TourPackage'> - Tours</Link></p> 
           <p> <Link className='Link'  to='/Flights'> - Flights</Link></p> 
          <p> <Link className='Link' to='/CarRentals'> - CarRentals</Link> </p> 
           <p> <Link className='Link'  to='/SignIn'> - SignIn</Link></p> 
        </div>
      </div>
      <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 address'>
          <b>Address</b>
          <div className='address-icons mt-3'>
          <div className='icons mt-1 me-3'>
          <FontAwesomeIcon icon={faPhone} />
            </div>
            <div>

              <p > +01 234 567 890 <br /> +09 876 543 210</p>
            </div>
          </div>
          <div className='address-icons'>
            <div className='icons me-3 mt-1'>
            <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div>
              <p> dreamdestination@gmail.com <br /> leylahuseyn@mail.ru</p>

            </div>
          </div>
          <div className='address-icons'>
            <div className='icons location-icon me-3 mt-1'>
            <FontAwesomeIcon icon={faLocationDot} />
            </div>
          <div>

              <p> 789 Inner Lane, Holy park, California, USA</p>
          </div>
          </div>
          
      </div>
    
      <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 address'>
      <b>Instagram Post</b>
              <div className="footer-instagram-images">
                <img className='mt-4' src="https://html.themeholy.com/tourm/demo/assets/img/widget/gallery_1_1.jpg" alt="" />
                <img className='mt-4' src="https://html.themeholy.com/tourm/demo/assets/img/widget/gallery_1_2.jpg" alt="" />
                <img className='mt-4' src="https://html.themeholy.com/tourm/demo/assets/img/widget/gallery_1_3.jpg" alt="" />
                <img src="https://html.themeholy.com/tourm/demo/assets/img/widget/gallery_1_4.jpg" alt="" />
                <img src="https://html.themeholy.com/tourm/demo/assets/img/widget/gallery_1_5.jpg" alt="" />
                <img src="https://html.themeholy.com/tourm/demo/assets/img/widget/gallery_1_6.jpg" alt="" />
      </div>

      </div>
    </div>
    </div>
    <div className="footer-bottom ">
      <div className="footer-last">
            <b>Copyright 2024 Tourm. All Rights Reserved.</b>
            <div className="footer-payment-icons">
              <b>We accept </b>
             
            </div>
          </div>
    </div>
    

    </div>
  )
}

export default Footer
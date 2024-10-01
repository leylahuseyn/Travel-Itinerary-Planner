import React from 'react'
import '../Banner/banner.css'

import 'bootstrap/dist/css/bootstrap.min.css'; 


const Banner = () => {
  return (
    <div className="banner-section">
      <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-headers-background.jpg" alt="Background" className="background-image" />
      
      <div className="text-content">
        <h1>Dream Destinations </h1>
        <p>For real travel bloggers looking to share their adventure with the world.</p>
        <button className="purchase-button">Purchase</button>
      </div>

      <div className="banner-images">
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-slide1-img-3.png" alt="Image 1" className="image1" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-slide1-img-1.png" alt="Image 2" className="image2" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/smajli-landing-img-7.png" alt="Image 3" className="image3" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-slide1-img-2.png" alt="Image 4" className="image4" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/smajli-landing-img-8.png" alt="Image 5" className="image5" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/smajli-landing-img-9.png" alt="Image 6" className="image6" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/08/about2-product-3.png" alt="Image 7" className="image7" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/10/landing-slider-top-image-2.png" alt="Image 8" className="image8" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-slide1-img-4.png" alt="Image 9" className="image9" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-slide1-img-5.png" alt="Image 10" className="image10" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/10/landing-slider-top-image-2.png" alt="Image 8" className="image12" />
        <img src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/video-slider-1.png" alt="Image 11" className="image11" />

      </div>
    </div>
  );
};

export default Banner;

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../TourPackage-components/Banner/tourBanner.css'
const TourBanner = () => {
    return (
        <div className='tour-banner'>
            <div className='banner-text'>
                <div className='banner-text-size'>
                    <h3 className='banner-name'>Get unforgetable pleasure with us</h3>
                    <h1 className='banner-txt'>Natural Wonder of the world</h1>
                    <button className='btnbanner btn  text-light mt-5'>Explore Tours</button>
                </div>
            </div>

        </div>
    )
}

export default TourBanner
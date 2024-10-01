import React, { useEffect } from 'react';
import Header from '../../../components/Layout/Header/Header';
import TourBanner from '../../../components/TourPackage-components/Banner/TourBanner';
import Tours from '../../../components/TourPackage-components/Tours/Tours';

const TourPackage = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <TourBanner />
      <Tours />
    </div>
  );
}

export default TourPackage;

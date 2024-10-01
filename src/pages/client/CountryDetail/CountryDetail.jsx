import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CountryDetail/countrydetail.css'
import Header from '../../../components/Layout/Header/Header';

const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4001/countries/${id}`) 
      .then((response) => response.json())
      .then((data) => setCountry(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!country) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Header/>
      <div className="background-container">
        <div className='country-img'>
        <img src={country.imgBanner} alt=""/>

        </div>
        <div className="content">
            <h1>{country.name}</h1>
            
        </div>
        <div className='container country-about'>
        <h1>About</h1>
      <p className='mt-3'>{country.description}</p>
        </div>

    </div>
 

    <section id="country1">
  <div class="container m-5">
    <div class="row justify-content-between">
      <div class="col-md-6 col-sm-12">
        <div class="img">
          <img style={{width: '80%', height: '70vh'}} src={country.img1} alt=""/>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 men">
        <h5>{country.imgName1}</h5>
        <div class="mt-3"></div>
        <p class="mt-4">{country.imgText1}</p>
        <button>{country.price1}</button>
      </div>
    </div>
  </div>
</section>

<section id="country2">
  <div class="container m-5">
    <div class="row justify-content-between">
      <div class="col-md-6 col-sm-12">
        <div class="img">
          <img style={{width: '80%', height: '70vh'}} src={country.img2} alt=""/>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 men">
        <h5>{country.imgName2}</h5>
        <div class="mt-3"></div>
        <p class="mt-4">{country.imgText2}</p>
        <button>{country.price2}</button>
      </div>
    </div>
  </div>
</section>

<section id="country3">
  <div class="container m-5">
    <div class="row justify-content-between">
      <div class="col-md-6 col-sm-12">
        <div class="img">
          <img style={{width: '80%', height: '70vh'}} src={country.img3} alt=""/>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 men">
        <h5>{country.imgName3}</h5>
        <div class="mt-3"></div>
        <p class="mt-4">{country.imgText3}</p>
        <button>{country.price3}</button>
      </div>
    </div>
  </div>
</section>

   
    </div>
  );
};

export default CountryDetail;

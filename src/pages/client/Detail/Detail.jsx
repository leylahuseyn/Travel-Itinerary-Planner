import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Detail/detail.css';
import Header from '../../../components/Layout/Header/Header';
import TourModal from '../../../components/TourModal/TourModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Detail = () => {
  const { cityId, hotelId } = useParams();
  const navigate = useNavigate();
  const [hotelDetail, setHotelDetail] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/cities`);
        const data = await response.json();

        window.scrollTo(0, 0);

        const cityData = data.find(city => city.id === cityId);
        if (cityData) {
          const hotelData = cityData.hotels.find(hotel => hotel.id === parseInt(hotelId));
          if (hotelData) {
            setHotelDetail({ ...hotelData, city: cityData.city, country: cityData.country });
          } else {
            console.error('Hotel not found');
          }
        } else {
          console.error('City not found');
        }
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };

    fetchHotelData();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setEmail(loggedInUser.username);
    }
  }, [cityId, hotelId, navigate]);

  const handleBookNow = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
      localStorage.setItem('redirectAfterLogin', `/detail/${cityId}/${hotelId}`);
      navigate('/SignIn');
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    if (redirectPath && JSON.parse(localStorage.getItem('loggedInUser'))) {
      navigate(redirectPath);
      localStorage.removeItem('redirectAfterLogin');
    }
  }, [navigate]);

  if (!hotelDetail) {
    return <p>Loading...</p>;
  }

  const calculatePrice = () => {
    let price = hotelDetail.price;
    if (selectedMeal === 'UAL') {
      price += 200;
    }
    if (selectedRoom === 'Lux') {
      price += 30;
    } else if (selectedRoom === 'DeLux') {
      price += 100;
    } else if (selectedRoom === 'KingSuit') {
      price += 500;
    }
    let totalPrice = (price * adults) + (price * 0.5 * children);
    return totalPrice;
  };

  const handleSave = (data) => {
    fetch('http://localhost:5000/tour-reserv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => {
        console.log('Booking saved:', data);
        setShowModal(false);
      })
      .catch(error => console.error('Error saving booking:', error));
  };

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className='detail-reserv'>
            <p className="tour-price detail-price">${calculatePrice().toFixed(2)}</p>
            <b>Tour Name</b>
            <p>{hotelDetail.name}</p>

            <b>Number of Adults</b>
            <div className="d-flex align-items-center mb-3">
              <button className="increment-decrement-btn" onClick={() => setAdults(adults > 1 ? adults - 1 : 1)}>-</button>
              <span className="count-display">{adults}</span>
              <button className="increment-decrement-btn" onClick={() => setAdults(adults + 1)}>+</button>
            </div>

            <b>Number of Children</b>
            <div className="d-flex align-items-center mb-3">
              <button className="increment-decrement-btn" onClick={() => setChildren(children > 0 ? children - 1 : 0)}>-</button>
              <span className="count-display">{children}</span>
              <button className="increment-decrement-btn" onClick={() => setChildren(children + 1)}>+</button>
            </div>

            <b>Tour Date</b>
            <p>{hotelDetail.date}</p>

            <b>Country</b>
            <p>{hotelDetail.city}, {hotelDetail.country}</p>

            <b>Hotel</b>
            <p>{hotelDetail.name}</p>

            <div className="tour-stars">
              {'★'.repeat(hotelDetail.stars || 0)}{'☆'.repeat(5 - (hotelDetail.stars || 0))}
            </div>

            <b>Meal Plan</b>
            <select
              className="form-select mb-3"
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
            >
              <option value="">Select Meal</option>
              <option value="UAL">UAL</option>
              <option value="UAI">UAI</option>
            </select>
            <b>Room Plan</b>
            <select className="form-select mb-3"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <option value="">Select Room</option>
              <option value="Standart">Standart</option>
              <option value="Lux">Lux</option>
              <option value="DeLux">DeLux</option>
              <option value="KingSuit">King Suit</option>
            </select>
            <b>Includes</b>
            <ul>
              <li>Hotel</li>
              <li>Transfer</li>
              <li>Insurance</li>
              <li>Flight Ticket</li>
              <li>Luggage 25kg</li>
              <li>Hand Luggage 10kg</li>
            </ul>

            <button className='btn btn-primary' onClick={handleBookNow}>Book now</button>

          </div>

          <div className="tour-detail">
            <div className='tour-detail-img'>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
              >
                <SwiperSlide> <img className='detail-imgs' src={hotelDetail.img} text="First slide" alt="" />
                </SwiperSlide>
                <SwiperSlide>  <img className='detail-imgs' src={hotelDetail.img2} text="First slide" alt="" />
                </SwiperSlide>
                <SwiperSlide>  <img className='detail-imgs' src={hotelDetail.img3} text="First slide" alt="" />
                </SwiperSlide>
                <SwiperSlide>  <img className='detail-imgs' src={hotelDetail.img4} text="First slide" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <Swiper className='swipper'
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
            >
              <SwiperSlide className='mt-3'>  <img className='detail-imgs-3' src={hotelDetail.img2} text="First slide" alt="" />
              </SwiperSlide>
              <SwiperSlide className='mt-3'>  <img className=' detail-imgs-3' src={hotelDetail.img3} text="First slide" alt="" />
              </SwiperSlide>
              <SwiperSlide className='mt-3'>  <img className=' detail-imgs-3' src={hotelDetail.img4} text="First slide" alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <TourModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        selectedTour={hotelDetail}
        selectedHotel={hotelDetail}
        selectedMeal={selectedMeal}
        selectedRoom={selectedRoom}
        price={calculatePrice()}
        adults={adults}
        children={children}
      />;
    </>
  );
};

export default Detail;

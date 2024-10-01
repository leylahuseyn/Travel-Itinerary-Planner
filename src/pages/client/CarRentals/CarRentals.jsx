import '../CarRentals/carRentals.css';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Layout/Header/Header';
import CarModal from '../../../components/CarModal/CarModal'; 

const CarRentals = () => {
  const [cars, setCars] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [showModal, setShowModal] = useState(false); 
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/cars')  
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleColorChange = (carId, color) => {
    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [carId]: color,
    }));
  };

  const handleBookNow = (car) => {
    if (car.availableCount > 0) { 
      const selectedColor = selectedColors[car.id] || 'white'; 
      const carWithColor = { ...car, selectedColor }; 
      setSelectedCar(carWithColor);
      setShowModal(true);
    } else {
      alert('error');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleSave = (formData) => {
    const selectedColor = selectedColors[formData.carId] || 'white'; 
    const formDataWithColor = { ...formData, selectedColor };

    fetch('http://localhost:4000/carReservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataWithColor), 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setCars(prevCars => 
          prevCars.map(car =>
            car.id === formData.carId ? { ...car, availableCount: car.availableCount - 1 } : car
          )
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Header />
      <div className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h3>Find the Best Ride</h3>
          <h1>Luxury Cars for Rent</h1>
          <a href="#cars" className="explore-btn">Explore Cars</a>
        </div>
      </div>
      <div className="text-center m-5">
        <h1 className="car-name">Car Rentals</h1>
      </div>
      <div className="car-list" id="cars">
        {cars.map((car) => (
          <div key={car.id} className={`car-card ${car.availableCount === 0 ? 'disabled' : ''}`}>
            <img
              src={selectedColors[car.id] === 'white' ? car.whiteImg : car.blackImg}
              alt={`${car.brand} ${car.model}`}
            />
            <h2>
              {car.brand} {car.model}
            </h2>
            <p>Seats: {car.seats}</p>
            <p>Daily Price: ${car.dailyPrice}</p>
            <p>Weekly Price: ${car.weeklyPrice}</p>
            <p>Monthly Price: ${car.monthlyPrice}</p>
            <p>Available: {car.availableCount}</p>

            <div className="filter-buttons">
              <button
                onClick={() => handleColorChange(car.id, 'white')}
                className={`btn ${selectedColors[car.id] === 'white' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                White
              </button>
              <button>|</button>
              <button
                onClick={() => handleColorChange(car.id, 'black')}
                className={`btn ${selectedColors[car.id] === 'black' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                Black
              </button>
            </div>

            <button 
              className="btn btn-outline-primary" 
              onClick={() => handleBookNow(car)}
              disabled={car.availableCount === 0} 
            >
              {car.availableCount === 0 ? 'Not Available' : 'Book Now'}
            </button>
          </div>
        ))}
      </div>

      {selectedCar && (
        <CarModal
          show={showModal}
          handleClose={handleCloseModal}
          handleSave={handleSave}
          selectedCar={selectedCar} 
        />
      )}
    </div>
  );
};

export default CarRentals;

import '../Flights/flights.css';
import Header from '../../../components/Layout/Header/Header';
import { useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import FlightModal from '../../../components/FlightModal/flightModal';

function FlightSearchForm() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const navigate = useNavigate();
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [roundTrip, setRoundTrip] = useState(false); 
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    additionalInfo: '',
    classType: 'ekonom',
    passengerCount: 1,
    luggage: false,
    fromCity: '',
    toCity: '',
    price: 0,
    roundTrip: false, 
  });

  const cities = [
    { id: 1, name: "Rome" },
    { id: 2, name: "Stockholm" },
    { id: 3, name: "Gian Island" },
    { id: 4, name: "Munich" },
    { id: 5, name: "Bali" },
    { id: 6, name: "Hanoi" },
    { id: 7, name: "Kuwait" },
    { id: 8, name: "Saint Petersburg" },
    { id: 9, name: "Dubai"},
    { id: 10, name: "Prague"},
    { id: 11, name: "Amsterdam"},
    { id: 12, name: "Vilnius" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const redirectPath = localStorage.getItem('redirectAfterLogin')
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setFormData((prev) => ({
        ...prev,
        email: loggedInUser.username, 
      }));
    }

    if (redirectPath && loggedInUser) {
      navigate(redirectPath);
      localStorage.removeItem('redirectAfterLogin');
    }
  }, [navigate]);

  const handleBookNow = (flight) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const currentPath = window.location.pathname; 

    if (!loggedInUser) {
      localStorage.setItem('redirectAfterLogin', currentPath); 
      navigate('/SignIn'); 
    } else {
      setSelectedFlight(flight);
      setFormData((prev) => ({
        ...prev,
        fromCity: cities.find(city => city.id === flight.fromCity)?.name || '',
        toCity: cities.find(city => city.id === flight.toCity)?.name || '',
        price: flight.price,
        passengerCount: 1,
        classType: 'ekonom',
        luggage: false,
        email: loggedInUser.username,  
             roundTrip, 
      }));
      setShowModal(true); 
    }
  };

  const handleSave = (data) => {
    fetch('http://localhost:5001/flights-reserve', {
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

  const fetchFlights = async () => {
    const response = await fetch('http://localhost:3000/flights');
    const data = await response.json();
    const filteredFlights = data.filter(
      flight =>
        flight.fromCity === parseInt(fromCity) &&
        flight.toCity === parseInt(toCity)
    );
    setFlights(filteredFlights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  const calculatePrice = (basePrice) => {
    let finalPrice = basePrice * formData.passengerCount;

    if (formData.classType === 'biznes') {
      finalPrice *= 1.5;
    }

    if (roundTrip) { 
      finalPrice *= 2;
    }

    if (formData.luggage) {
      finalPrice += 20;
    }

    return finalPrice;
  };

  return (
    <div className='flights'>
      <Header />
      <div className="flights-banner">
        <div className="container flights-body ">
          <h1>Ticket</h1>
          
          <form onSubmit={handleSubmit}>
            <label>
              From:
              <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
                <option value="">Select a city</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </label>

            <label>
              To:
              <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
                <option value="">Select a city</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </label>

            <label>
              Departure Date:
              <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            </label>

            {roundTrip && (
              <label>
                Return Date:
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
              </label>
            )}

            <label>
              Trip Type:
              <select value={roundTrip} onChange={(e) => setRoundTrip(e.target.value === "true")}>
                <option value="false">One-way</option>
                <option value="true">Round Trip</option>
              </select>
            </label>

            <div>
              <button type="submit" className='btn btn-primary button-search'>Search</button>
            </div>
          </form>

          <hr />
          {flights.length > 0 && (
            <div className="table-responsive">
              <table className='table table-bordered mt-5'>
                <thead>
                  <tr>
                    <th>Cities</th>
                    <th>Departure Date</th>
                    {roundTrip && <th>Return Date</th>}
                    <th>Total Price</th>
                    <th>Passenger Count</th>
                    <th>Class</th>
                    <th>Luggage</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight) => (
                    <tr key={flight.id}>
                      <td>
                        {cities.find(city => city.id === flight.fromCity)?.name} -{' '}
                        {cities.find(city => city.id === flight.toCity)?.name}
                      </td>
                      <td>{flight.departureDate}</td>
                      {roundTrip && <td>{flight.returnDate}</td>}
                      <td>${calculatePrice(flight.price)}</td>

                      <td>
                        <input className='input'
                          type="number"
                          value={formData.passengerCount}
                          onChange={(e) => setFormData({ ...formData, passengerCount: parseInt(e.target.value) || 1 })}
                          min="1"
                        />
                      </td>
                      <td>
                        <select className='select' value={formData.classType} onChange={(e) => setFormData({ ...formData, classType: e.target.value })}>
                          <option value="ekonom">Economy</option>
                          <option value="biznes">Business</option>
                        </select>
                      </td>
                      <td>
                        <input type="checkbox" checked={formData.luggage} onChange={(e) => setFormData({ ...formData, luggage: e.target.checked })} />
                      </td>
                      <td>
                        <button className='btn btn-sm btn-outline-primary' onClick={() => handleBookNow(flight)}>Book now</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selectedFlight && (
        <FlightModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
          flight={selectedFlight}
          formData={formData}
          setFormData={setFormData}
          cities={cities}
        />
      )}
    </div>
  );
}

export default FlightSearchForm;

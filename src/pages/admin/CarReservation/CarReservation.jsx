import React, { useState, useEffect } from 'react';
import '../CarReservation/carreservation.css';
import { Card, Button } from 'react-bootstrap';
import AdminHeader from '../AdminHeader/adminHeader';

const AdminCarRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:4000/carReservations')
      .then((response) => response.json())
      .then((data) => setRentals(data))
      .catch((error) => console.error('Error fetching data:', error));

      
    fetch('http://localhost:4000/cars')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching car data:', error));
  }, []);

  const getCarDetails = (carId) => {
    return cars.find(car => car.id === carId) || {};
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/carReservations/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Delete successful');
          setRentals(prevRentals => prevRentals.filter(rental => rental.id !== id));
        } else {
          console.error('Delete failed:', response.status);
        }
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  return (
    <>
      <AdminHeader />
      <h1 className="text-center m-5">Car Rentals - Admin Panel</h1>
      <div className="car-container mt-5">
        <div className="rental-list">
          {rentals.length === 0 ? (
            <p>No rentals available yet.</p>
          ) : (
            rentals.map((rental, index) => {
              const carDetails = getCarDetails(rental.carId);
              const carImage = rental.selectedColor === 'white' ? carDetails.whiteImg : carDetails.blackImg; 
              return (
                <Card key={index} className="rental-card mb-4">
                  <div className="card-horizontal">
                    <Card.Img
                      variant="left"
                      src={carImage} 
                      alt={`${carDetails.brand} ${carDetails.model}`}
                      className="rental-car-image"
                    />
                    <Card.Body>
                      <Card.Title>
                        {rental.firstName} {rental.lastName}
                      </Card.Title>
                      <Card.Text>
                        <strong>Email:</strong> {rental.email}<br />
                        <strong>Phone Number:</strong> {rental.phoneNumber}<br />
                        <strong>City:</strong> {rental.selectedCity || 'N/A'}<br />
                        <strong>Date:</strong> {rental.selectedDate || 'N/A'}<br />
                        <strong>Car Brand:</strong> {carDetails.brand || 'N/A'}<br />
                        <strong>Car Model:</strong> {carDetails.model || 'N/A'}<br />
                        <strong>Car Color:</strong> {rental.selectedColor || 'N/A'}<br /> 
                        <strong>Additional Information:</strong> {rental.additionalInfo || 'N/A'}
                      </Card.Text>
                      
                      <Button variant="danger" onClick={() => handleDelete(rental.id)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCarRentals;

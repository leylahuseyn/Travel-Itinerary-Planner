import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const cities = [
  { id: 1, name: "Rome" },
  { id: 2, name: "Stockholm" },
  { id: 3, name: "Gian Island" },
  { id: 4, name: "Munich" },
  { id: 5, name: "Bali" },
  { id: 6, name: "Hanoi" },
  { id: 7, name: "Kuwait" },
  { id: 8, name: "Saint Petersburg" },
  { id: 9, name: "Dubai" },
  { id: 10, name: "Prague" },
  { id: 11, name: "Amsterdam" },
  { id: 12, name: "Vilnius" },
];

const CarModal = ({ show, handleClose, handleSave, selectedCar }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    selectedCity: '',
    selectedDate: '',
    rentDuration: 'daily',
    carId: selectedCar ? selectedCar.id : null, 
    carBrand: selectedCar ? selectedCar.brand : '', 
    carModel: selectedCar ? selectedCar.model : '', 

  });

  const [price, setPrice] = useState(0); 

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setFormData(prevFormData => ({
        ...prevFormData,
        email: loggedInUser.username
      }));
    }

    if (selectedCar) {
      setFormData(prevFormData => ({
        ...prevFormData,
        carId: selectedCar.id,
        carBrand: selectedCar.brand,
        carModel: selectedCar.model
      }));

      setPrice(selectedCar.dailyPrice);
    }
  }, [show, selectedCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'rentDuration') {
      if (value === 'daily') {
        setPrice(selectedCar.dailyPrice);
      } else if (value === 'weekly') {
        setPrice(selectedCar.weeklyPrice);
      } else if (value === 'monthly') {
        setPrice(selectedCar.monthlyPrice);
      }
    }
  };

  const isValidEmail = (email) => {
    return email.includes('@');
  };

  const onSave = () => {
    const { firstName, lastName, email, phoneNumber, additionalInfo, selectedCity, selectedDate } = formData;

    if (!isValidEmail(email)) {
      alert('Invalid email. The email must contain "@" symbol.');
      return;
    }

    if (firstName && lastName && phoneNumber  && selectedCity && selectedDate) {
      handleSave(formData);
      alert('Reservation successfully completed!');

      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: formData.email,
        selectedCity: '',
        selectedDate: '',
        rentDuration: 'daily', 
        carId: selectedCar ? selectedCar.id : null,
        carBrand: selectedCar ? selectedCar.brand : '',
        carModel: selectedCar ? selectedCar.model: ''
      });

      handleClose();
    } else {
      alert('All fields must be filled!');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book a Car for {selectedCar.brand} {selectedCar.model}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label className='text-dark'>First Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="First Name" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label className='text-dark'>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Last Name" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label className='text-dark'>Email</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              value={formData.email} 
              disabled
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label className='text-dark'>Phone Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Phone Number" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group controlId="selectedCity">
            <Form.Label className='text-dark'>Select a City</Form.Label>
            <Form.Control 
              as="select" 
              name="selectedCity" 
              value={formData.selectedCity} 
              onChange={handleChange}
            >
              <option value="">Select a city</option>
              {cities.map(city => (
                <option key={city.id} value={city.name}>{city.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="selectedDate">
            <Form.Label className='text-dark'>Select a Date</Form.Label>
            <Form.Control 
              type="date" 
              name="selectedDate" 
              value={formData.selectedDate} 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group controlId="rentDuration">
            <Form.Label className='text-dark'>Select Rent Duration</Form.Label>
            <Form.Control 
              as="select" 
              name="rentDuration" 
              value={formData.rentDuration} 
              onChange={handleChange}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label className='text-dark'>Price for {formData.rentDuration}</Form.Label>
            <Form.Control 
              type="text" 
              name="price" 
              value={`$${price}`} 
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="carBrand">
            <Form.Label className='text-dark'>Car Brand</Form.Label>
            <Form.Control 
              type="text" 
              name="carBrand" 
              value={selectedCar.brand} 
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="carModel">
            <Form.Label className='text-dark'>Car Model</Form.Label>
            <Form.Control 
              type="text" 
              name="carModel" 
              value={selectedCar.model} 
              readOnly
            />
          </Form.Group>

         

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={onSave}>Book</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CarModal;

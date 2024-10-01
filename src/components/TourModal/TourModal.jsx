import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TourModal = ({ show, handleClose, handleSave, selectedTour, selectedHotel, selectedMeal, selectedRoom, price, adults, children }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    additionalInfo: '',
    email: '',
    tourId: selectedTour ? selectedTour.id : null,
    tourCountry: selectedTour ? selectedTour.country : '',
    tourCity: selectedTour ? selectedTour.city : '',
    tourHotel: selectedHotel ? selectedHotel.name : '',
    mealPlan: selectedMeal,
    roomType: selectedRoom,
    price: price,
    passengerCount: adults + children,
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setFormData(prevFormData => ({
        ...prevFormData,
        email: loggedInUser.username
      }));
    }

    if (selectedTour && selectedHotel) {
      setFormData(prevFormData => ({
        ...prevFormData,
        tourId: selectedTour.id,
        tourCountry: selectedTour.country,
        tourCity: selectedTour.city,
        tourHotel: selectedHotel.name,
        mealPlan: selectedMeal,
        roomType: selectedRoom,
        price: price,
        passengerCount: adults + children,
      }));
    }
  }, [show, selectedTour, selectedHotel, selectedMeal, selectedRoom, price, adults, children]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const isValidEmail = (email) => {
    return email.includes('@');
  };

  const onSave = () => {
    const { firstName, lastName, email, phoneNumber, additionalInfo, tourId } = formData;

    if (!isValidEmail(email)) {
      alert('Invalid email. The email must contain "@" symbol.');
      return;
    }

    if (firstName && lastName && phoneNumber && additionalInfo && tourId) {
      handleSave(formData);
      alert('Reservation successfully completed!');

      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        additionalInfo: '',
        email: formData.email,
        tourId: selectedTour ? selectedTour.id : null,
        tourCountry: selectedTour ? selectedTour.country : '',
        tourCity: selectedTour ? selectedTour.city : '',
        tourHotel: selectedHotel ? selectedHotel.name : '',
        mealPlan: selectedMeal,
        roomType: selectedRoom,
        price: price,
        passengerCount: adults + children,
      });

      handleClose();
    } else {
      alert('All fields must be filled!');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book a Tour for {selectedTour.country} {selectedTour.city}</Modal.Title>
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
          <Form.Group controlId="additionalInfo">
            <Form.Label className='text-dark'>Additional Information</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Additional Information"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className='text-dark'>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              readOnly
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="tourId">
            <Form.Label className='text-dark'>Tour ID</Form.Label>
            <Form.Control
              type="text"
              name="tourId"
              value={formData.tourId}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="tourCountry">
            <Form.Label className='text-dark'>Tour Country</Form.Label>
            <Form.Control
              type="text"
              name="tourCountry"
              value={formData.tourCountry}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="tourCity">
            <Form.Label className='text-dark'>Tour City</Form.Label>
            <Form.Control
              type="text"
              name="tourCity"
              value={formData.tourCity}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="tourHotel">
            <Form.Label className='text-dark'>Tour Hotel</Form.Label>
            <Form.Control
              type="text"
              name="tourHotel"
              value={formData.tourHotel}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="mealPlan">
            <Form.Label className='text-dark'>Meal Plan</Form.Label>
            <Form.Control
              type="text"
              name="mealPlan"
              value={formData.mealPlan}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="roomType">
            <Form.Label className='text-dark'>Room Type</Form.Label>
            <Form.Control
              type="text"
              name="roomType"
              value={formData.roomType}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="passengerCount">
            <Form.Label className='text-dark'>Passenger Count</Form.Label>
            <Form.Control
              type="text"
              name="passengerCount"
              value={formData.passengerCount}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label className='text-dark'>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={`$${formData.price}`}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={onSave}>Book Now</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TourModal;

import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect } from "react";
import '../FlightModal/flightmodal.css'

const FlightModal = ({ show, handleClose, handleSave, flight, formData, setFormData, cities }) => {

  useEffect(() => {
    if (flight) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fromCity: cities.find(city => city.id === flight.fromCity)?.name || '',
        toCity: cities.find(city => city.id === flight.toCity)?.name || '',
        price: flight.price || 0,
        passengerCount: prevFormData.passengerCount || 1,
        classType: prevFormData.classType || 'ekonom',
        luggage: prevFormData.luggage || false,
        firstName: prevFormData.firstName || '',
        lastName: prevFormData.lastName || '',
        email: prevFormData.email || '',
        phoneNumber: prevFormData.phoneNumber || '',
        additionalInfo: prevFormData.additionalInfo || '',
        roundTrip: prevFormData.roundTrip || false, 
      }));
    }
  }, [flight, cities, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,

    }));
  };

  const calculatePrice = () => {
    let basePrice = flight?.price || 0;

    if (formData.classType === "biznes") {
      basePrice *= 1.5;
    }

    if (formData.luggage) {
      basePrice += 20;
    }

    if (formData.roundTrip) { 
      basePrice *= 2;
    }

    basePrice *= formData.passengerCount;

    return basePrice;
  };

 const handleSaveBooking = () => {
  const { fromCity, toCity, email, firstName, lastName, phoneNumber, passengerCount } = formData;

  if (!fromCity || !toCity || !email || !firstName || !lastName || !phoneNumber || !passengerCount) {
    alert('All fields must be filled!');
    return;
  }

  const totalPrice = calculatePrice(); 
  const updatedData = { ...formData, price: totalPrice }; 

  handleSave(updatedData); 
  alert('Reservation successfully completed!');
};


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Flight Reservation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>From City:</Form.Label>
            <Form.Control
              type="text"
              value={formData.fromCity}
              name="fromCity"
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>To City:</Form.Label>
            <Form.Control
              type="text"
              value={formData.toCity}
              name="toCity"
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Passenger Count</Form.Label>
            <Form.Control
              type="number"
              value={formData.passengerCount}
              name="passengerCount"
              onChange={handleChange}
              min="1"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="text"
              value={`$${calculatePrice()}`}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email || ''} 
              name="email"
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.firstName || ''}
              name="firstName"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.lastName || ''}
              name="lastName"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={formData.phoneNumber || ''}
              name="phoneNumber"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Additional Info</Form.Label>
            <Form.Control
              type="text"
              value={formData.additionalInfo || ''}
              name="additionalInfo"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Class Type</Form.Label>
            <Form.Select
              value={formData.classType}
              name="classType"
              onChange={handleChange}
            >
              <option value="ekonom">Economy</option>
              <option value="biznes">Business</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Luggage"
              checked={formData.luggage}
              name="luggage"
              onChange={handleCheckBoxChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveBooking}>
          Book Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FlightModal;

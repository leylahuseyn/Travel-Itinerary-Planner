import React, { useState, useEffect } from 'react';
import AdminHeader from '../../admin/AdminHeader/adminHeader'
const FlightsReserv = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/flights-reserve')
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error('Error fetching reservations:', error));
  }, []);
  const handleDelete = (id) =>{
    fetch (`http://localhost:5001/flights-reserve/${id}`,{
        method: 'Delete'
    })
    .then(response => {
        if (response.ok) {
          setReservations(reservations.filter(reservation => reservation.id !== id));
        } else {
          console.error('Failed to delete reservation');
        }
      })
      .catch(error => console.error('Error deleting reservation:', error));
 
  }

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h1>Flight Reservations</h1>
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>From City</th>
                <th>To City</th>
                <th>Passenger Count</th>
                <th>Price</th>
                <th>Class</th>
                <th>Luggage</th>
                <th>Additional Info</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.firstName}</td>
                  <td>{reservation.lastName}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phoneNumber}</td>
                  <td>{reservation.fromCity}</td>
                  <td>{reservation.toCity}</td>
                  <td>{reservation.passengerCount}</td>
                  <td>${reservation.price}</td>
                  <td>{reservation.classType}</td>
                  <td>{reservation.luggage ? 'Yes' : 'No'}</td>
                  <td>{reservation.additionalInfo}</td>
                  <td><button className='btn btn-outline-danger' onClick={()=> handleDelete(reservation.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FlightsReserv;

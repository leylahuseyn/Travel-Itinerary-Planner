import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from '../AdminHeader/adminHeader';
import '../TourReservation/reservationDetail.css';

const ReservationDetail = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/tour-reserv/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Tour rezervasiyası tapılmadı');
        }
        return response.json();
      })
      .then(data => {
        setReservation(data);
      })
      .catch(error => console.error('Rezervasiya məlumatlarını əldə edərkən xəta:', error));
  }, [id]);

  if (!reservation) {
    return <p>Yüklənir...</p>;
  }

  return (
    <>
      <AdminHeader />
      <div className="container mt-5 mb-5">
        <h1 className='text-center'>Rezervasiya Detalları</h1>
        <div className='card-tourreserv '>
          <div className='card mt-5'>
            <p><strong>First Name:</strong> {reservation.firstName}</p>
            <p><strong>Last Name:</strong> {reservation.lastName}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Phone Number:</strong> {reservation.phoneNumber}</p>
            <p><strong>Additional Info:</strong> {reservation.additionalInfo}</p>
            <p><strong>Passenger Count:</strong> {reservation.passengerCount}</p>
            <p><strong>Price:</strong> ${reservation.price}</p>
            <p><strong>Meal Plan:</strong> {reservation.mealPlan}</p>
            <p><strong>Room Type:</strong> {reservation.roomType}</p>
            <hr />
            <p><strong>City:</strong> {reservation.tourCity}</p>
            <p><strong>Country:</strong> {reservation.tourCountry}</p>
            <p><strong>Hotel:</strong> {reservation.tourHotel}</p>

          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationDetail;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../AdminHeader/adminHeader';

const TourReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null); 
  const [updatedReservation, setUpdatedReservation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    additionalInfo: '',
    tourId: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/tour-reserv')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/tour-reserv/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setReservations(reservations.filter(reservation => reservation.id !== id));
        } else {
          console.error('Failed to delete reservation');
        }
      })
      .catch(error => console.error('Error deleting reservation:', error));
  };

  const handleDetail = (id) => {
    navigate(`/admin/TourReservation/${id}`);
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setUpdatedReservation(reservation); 
  };

  const handleEditSave = () => {
    fetch(`http://localhost:5000/tour-reserv/${editingReservation.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedReservation)
    })
      .then(response => response.json())
      .then(data => {
        setReservations(reservations.map(reservation => reservation.id === data.id ? data : reservation));
        setEditingReservation(null);
      })
      .catch(error => console.error('Error updating reservation:', error));
  };

  return (
    <>
      <AdminHeader />
      <h1 className='text-center m-5'>Tour Reservations</h1>
      <div className="container mb-5">
        <hr />
        <table className="table ">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Additional Info</th>
              <th>Tour Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.firstName}</td>
                <td>{reservation.lastName}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phoneNumber}</td>
                <td>{reservation.additionalInfo}</td>
                <td>{reservation.tourId}</td>

                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleDetail(reservation.id)}>Detail</button>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(reservation)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(reservation.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingReservation && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Reservation</h5>
                <button type="button" className="btn-close" onClick={() => setEditingReservation(null)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedReservation.firstName}
                    onChange={(e) => setUpdatedReservation({ ...updatedReservation, firstName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedReservation.lastName}
                    onChange={(e) => setUpdatedReservation({ ...updatedReservation, lastName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={updatedReservation.email}
                    onChange={(e) => setUpdatedReservation({ ...updatedReservation, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedReservation.phoneNumber}
                    onChange={(e) => setUpdatedReservation({ ...updatedReservation, phoneNumber: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Additional Info</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedReservation.additionalInfo}
                    onChange={(e) => setUpdatedReservation({ ...updatedReservation, additionalInfo: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tour ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedReservation.tourId}
                    onChange={(e) => setUpdatedReservation({ ...updatedReservation, tourId: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingReservation(null)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleEditSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TourReservations;

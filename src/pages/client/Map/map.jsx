import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom'; 
import 'leaflet/dist/leaflet.css';
import '../Map/map.css';
import Header from '../../../components/Layout/Header/Header'
const countryData = [
  { "id": 1, "name": "Rome", "lat": 41.9028, "lng": 12.4964 },
  { "id": 2, "name": "Stockholm", "lat": 59.3293, "lng": 18.0686 },
  { "id": 3, "name": "Gian Island", "lat": -0.2391, "lng": 99.9420 }, 
  { "id": 4, "name": "Munich", "lat": 48.1351, "lng": 11.5820 },
  { "id": 5, "name": "Bali", "lat": -8.4095, "lng": 115.1889 },
  { "id": 6, "name": "Hanoi", "lat": 21.0285, "lng": 105.8542 },
  { "id": 7, "name": "Kuwait", "lat": 29.3759, "lng": 47.9774 },
  { "id": 8, "name": "Saint Petersburg", "lat": 59.9343, "lng": 30.3351 },
  { "id": 9, "name": "Dubai", "lat": 25.276987, "lng": 55.296249 },
  { "id": 10, "name": "Prague", "lat": 50.0755, "lng": 14.4378 },
  { "id": 11, "name": "Amsterdam", "lat": 52.3676, "lng": 4.9041 },
  { "id": 12, "name": "Vilnius", "lat": 54.6872, "lng": 25.2797 }
];

const CountryMap = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  const handleMarkerClick = (id) => {
    navigate(`/country/${id}`); 
  };

  const handleSelectChange = (event) => {
    const countryId = parseInt(event.target.value);
    setSelectedCountry(countryId);
  };

  const selectedCoordinates = countryData.find(country => country.id === selectedCountry);

  return (
    <>
    
      <Header/>
    <div className='countrydetail'>
      <select 
        onChange={handleSelectChange} 
        defaultValue="" 
        className='country-select'
        
      >
        <option value="" disabled>Select a country</option>
        {countryData.map(country => (
          <option key={country.id} value={country.id}>{country.name}</option>
        ))}
      </select>

      <MapContainer center={[41.9028, 12.4964]} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {selectedCoordinates && (
          <Marker
            key={selectedCoordinates.id}
            position={[selectedCoordinates.lat, selectedCoordinates.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(selectedCoordinates.id),
            }}
          >
            <Popup>{selectedCoordinates.name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>

    </>
  );
};

export default CountryMap;

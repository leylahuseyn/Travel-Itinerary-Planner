import React, { useEffect, useState } from 'react';
import '../Tours/tours.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/wishlistSlice';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [dateOrder, setDateOrder] = useState('');
  const [selectedStar, setSelectedStar] = useState(''); 
  const [visibleHotels, setVisibleHotels] = useState(6);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    fetch('http://localhost:3001/cities')
      .then((response) => response.json())
      .then((data) => {
        setTours(data);
        setFilteredTours(data);
        const uniqueCities = [...new Set(data.map((tour) => tour.city))];
        setCities(uniqueCities);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleFilterChange = (city) => {
    setSelectedCity(city);
    let updatedTours = tours;
    if (city !== '') {
      updatedTours = tours.filter((tour) => tour.city === city);
    }
    if (selectedStar !== '') {
      updatedTours = updatedTours.map((tour) => ({
        ...tour,
        hotels: tour.hotels.filter((hotel) => hotel.stars === parseInt(selectedStar))
      }));
    }
    setFilteredTours(updatedTours);
    setVisibleHotels(9);
    handleSortChange(sortOrder, updatedTours);
    handleDateSortChange(dateOrder, updatedTours);
  };

  const handleStarFilterChange = (star) => {
    setSelectedStar(star);
    let updatedTours = tours;
    
    if (selectedCity !== '') {
      updatedTours = updatedTours.filter((tour) => tour.city === selectedCity);
    }

    if (star !== '') {
      updatedTours = updatedTours.map((tour) => ({
        ...tour,
        hotels: tour.hotels.filter((hotel) => hotel.stars === parseInt(star))
      }));
    }
    
    setFilteredTours(updatedTours);
    setVisibleHotels(9);
    handleSortChange(sortOrder, updatedTours);
    handleDateSortChange(dateOrder, updatedTours);
  };

  const handleSortChange = (order, currentTours = [...filteredTours]) => {
    setSortOrder(order);
    const sortedTours = currentTours.map((tour) => {
      const sortedHotels = [...tour.hotels];
      if (order === 'asc') {
        sortedHotels.sort((a, b) => a.price - b.price);
      } else if (order === 'desc') {
        sortedHotels.sort((a, b) => b.price - a.price);
      }
      return { ...tour, hotels: sortedHotels };
    });
    setFilteredTours(sortedTours);
  };

  const handleDateSortChange = (order, currentTours = [...filteredTours]) => {
    setDateOrder(order);
    const sortedTours = currentTours.map((tour) => {
      const sortedHotels = [...tour.hotels];
      if (order === 'closest') {
        sortedHotels.sort((a, b) => new Date(a.date.split(' / ')[0]) - new Date(b.date.split(' / ')[0]));
      } else if (order === 'farthest') {
        sortedHotels.sort((a, b) => new Date(b.date.split(' / ')[0]) - new Date(a.date.split(' / ')[0]));
      }
      return { ...tour, hotels: sortedHotels };
    });
    setFilteredTours(sortedTours);
  };

  const loadMore = () => {
    setVisibleHotels((prevVisible) => prevVisible + 3);
  };

  const isInWishlist = (hotel) =>
    wishlist.some((item) => item.id === hotel.id && item.cityId === hotel.cityId);

  const handleWishlistClick = (hotel) => {
    if (isInWishlist(hotel)) {
      dispatch(removeFromWishlist(hotel));
      alert('Removed from wishlist');
    } else {
      dispatch(addToWishlist(hotel));
      alert('Added to wishlist!');
    }
  };

  const totalHotels = filteredTours.reduce((total, tour) => total + tour.hotels.length, 0);
  const displayedHotels = filteredTours.flatMap(tour =>
    tour.hotels.map(hotel => ({ ...hotel, cityId: tour.id, city: tour.city, country: tour.country }))
  ).slice(0, visibleHotels);

  return (
    <div className="container">
      <div className='tours-page'>
        <div className='tour-1'>
          <h1>Filter</h1>
          <select className="form-select mb-3" value={selectedCity} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <select className="form-select mb-3" value={sortOrder} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <select className="form-select mb-3" value={dateOrder} onChange={(e) => handleDateSortChange(e.target.value)}>
            <option value="">Sort by Date</option>
            <option value="closest">Closest Date</option>
            <option value="farthest">Farthest Date</option>
          </select>
          <select className="form-select mb-3" value={selectedStar} onChange={(e) => handleStarFilterChange(e.target.value)}>
            <option value="">Filter by Stars</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
          </select>
        </div>
        <div className='tour-2'>
          <div className="row">
            {displayedHotels.map((hotel) => (
              <div className="col-lg-4 col-md-6 mb-4" key={hotel.id}>
                <div className="tour-card">
                  <img src={hotel.img} alt="Tour Image" className="tour-image" />
                  <div className="tour-info">
                    <h3 className="tour-title mt-2">{hotel.name}</h3>
                    <p>{hotel.city} / {hotel.country}</p>
                    <p className="tour-date">{hotel.date}</p>
                    <div className="tour-stars">
                      {'★'.repeat(hotel.stars || 0)}{'☆'.repeat(5 - (hotel.stars || 0))}
                    </div>
                    <p className="tour-price">${hotel.price}</p>

                    <div className="d-flex  justify-content-around align-items-center">
                      <Link to={`/detail/${hotel.cityId}/${hotel.id}`}>
                        <button className='btn-detail'>Detail</button>
                      </Link>
                      <button
                        className={`btn-wishlist ${isInWishlist(hotel) ? 'added' : ''}`}
                        onClick={() => handleWishlistClick(hotel)}
                      >
                        <i className={`fa${isInWishlist(hotel) ? 's' : 'r'} fa-heart`}></i>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
          {visibleHotels < totalHotels && (
            <div className="text-center my-4">
              <button className="btn btn-primary" onClick={loadMore}>Load More</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tours;

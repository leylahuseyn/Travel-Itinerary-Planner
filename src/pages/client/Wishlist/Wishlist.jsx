import React, {useEffect} from 'react';
import './wishlist.css'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../../redux/wishlistSlice'; 
import { Link } from 'react-router-dom';
import Header from '../../../components/Layout/Header/Header';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  if (!wishlist) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <Header/>
    
    <div className="container wishlist mt-5 mb-5">
      <h1 >Wishlist</h1>
      <hr />
      {wishlist.length === 0 ? (
        <p className='text-center mt-5'>No items in wishlist.</p>
      ) : (
        <div className="row mt-4 ">
          {wishlist.map((hotel) => (
            <div className="col-lg-4 col-md-6 mb-4 center" key={hotel.id}>
              <div className="tour-card">
                <img src={hotel.img} alt="Tour Image" className="tour-image" />
                <div className="tour-info">
                  <h3 className="tour-title mt-2">{hotel.name}</h3>
                  <p>{hotel.city} / {hotel.country}</p>
                  <p className="tour-date">{hotel.date}</p>
                  <div className="tour-stars">
                    {'★'.repeat(hotel.stars || 0)}{'☆'.repeat(5 - (hotel.stars || 0))}
                  </div>
                  <div>
                  <p className="tour-price">${hotel.price}</p>
                  <div className='d-flex'>
                  <Link to={`/detail/${hotel.cityId}/${hotel.id}`}>
                        <button className='btn btn-outline-primary'>Detail</button>
                      </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => dispatch(removeFromWishlist(hotel))}
                  >
                    X
                  </button>

                  </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Wishlist;

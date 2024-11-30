import React, { useEffect } from 'react'
import './RestaurantPage.css'
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurant } from '../../service/restaurantService'

const RestaurantPage = () => {
    const dispatch = useDispatch()
    const { allRestaurant, loading, error } = useSelector((state) => state.allrestaurant);
    useEffect(() => {
        dispatch(getAllRestaurant());
    }, [dispatch]);

    const mapRestaurants = allRestaurant?.data || []
    console.log('allRestaurant', mapRestaurants)

    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p>Error loading hotels: {error}</p>;
    return (
        <div className='wrapper_res'>
            <p className='nav_hotel'>
                <span>Trang chủ</span>
                <span> / </span>
                <span>Du lịch Hà Nội</span>
            </p>
            <h2 className='title_hotel-page'>Nhà Hàng - Quán Ăn</h2>
            <div className="restaurant-list">
                {mapRestaurants?.map((restaurant, index) => (
                    <div key={index} className="restaurant-card">
                        <div className="restaurant-image">
                            {restaurant.images?.map((item, indexx) => (
                                <img key={indexx} src={item.url} alt={restaurant.name} />
                            ))}
                            <FaHeart className="favorite-icon" />
                        </div>
                        <div className="restaurant-info">
                            <div className="location">
                                <FaMapMarkerAlt />
                                <span>{restaurant.address}</span>
                            </div>
                            <div className="rating">
                                {"★".repeat(Math.floor(restaurant.rating))}
                                <span>{restaurant.rating}/5.0</span> ({restaurant.reviews} review)
                            </div>
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <div className="price">
                                Giá <strong>{restaurant.price} đ</strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantPage

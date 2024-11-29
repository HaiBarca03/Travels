import React, { useEffect } from 'react'
import './HotelPage.css'
import FilterCpm from '../../components/Filter/FilterCpm'
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Col, Row } from 'antd'
import { getAllHotel } from '../../service/hotelService';
import { useDispatch, useSelector } from 'react-redux';

const HotelPage = () => {
    const dispatch = useDispatch();
    const { hotel, loading, error } = useSelector((state) => state.hotel);
    useEffect(() => {
        dispatch(getAllHotel());
    }, [dispatch]);

    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p>Error loading hotels: {error}</p>;

    const hotels = [
        {
            image: "image_url_1",
            location: "Greater London, United Kingdom",
            name: "New York Marriott Downtown",
            rating: 4.0,
            reviews: 1,
            price: 634.0,
        },
        {
            image: "image_url_2",
            location: "Greater London, United Kingdom",
            name: "New York Marriott Downtown",
            rating: 4.0,
            reviews: 1,
            price: 634.0,
        },
        {
            image: "image_url_3",
            location: "Greater London, United Kingdom",
            name: "New York Marriott Downtown",
            rating: 4.0,
            reviews: 1,
            price: 634.0,
        },
        {
            image: "image_url_3",
            location: "Greater London, United Kingdom",
            name: "New York Marriott Downtown",
            rating: 4.0,
            reviews: 1,
            price: 634.0,
        },
        {
            image: "image_url_3",
            location: "Greater London, United Kingdom",
            name: "New York Marriott Downtown",
            rating: 4.0,
            reviews: 1,
            price: 634.0,
        },
    ];
    const mapHotels = hotel?.data || []

    return (
        <div className='main_hotel'>
            <p className='nav_hotel'>
                <span>Trang chủ</span>
                <span> / </span>
                <span>Du lịch Hà Nội</span>
            </p>
            <h2 className='title_hotel-page'>Khách sạn</h2>
            <Row gutter={16} style={{ padding: "20px" }}>
                <Col span={6}>
                    <FilterCpm />
                </Col>
                <Col span={18}>
                    <div className="hotel-list">
                        {mapHotels?.map((hotel, index) => (
                            <div key={index} className="hotel-card">
                                <div className="hotel-image">
                                    {hotel.images?.map((item, indexx) => (
                                        <img key={indexx} src={item.url} alt={hotel.name} />
                                    ))}
                                    <FaHeart className="favorite-icon" />
                                </div>
                                <div className="hotel-info">
                                    <div className="location">
                                        <FaMapMarkerAlt />
                                        <span>{hotel.address}</span>
                                    </div>
                                    <div className="rating">
                                        {"★".repeat(Math.floor(hotel.rating))}
                                        <span>{hotel.rating}/5.0</span> ({hotel.reviews} review)
                                    </div>
                                    <h3 className="hotel-name">{hotel.name}</h3>
                                    <div className="price">
                                        Giá <strong>{hotel.price} đ</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HotelPage

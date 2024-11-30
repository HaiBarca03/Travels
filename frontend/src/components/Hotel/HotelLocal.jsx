import { Alert, Button, Col, Rate, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import './HotelLocal.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelByLocal } from '../../service/hotelService';

const HotelLocal = ({ locationId }) => {
    const dispatch = useDispatch();
    console.log('locationId', locationId)
    const { hotels, loading, error } = useSelector((state) => state.hotel);
    console.log('hotels', hotels)
    useEffect(() => {
        if (locationId) {
            dispatch(getHotelByLocal({ locationId }));
        }
    }, [locationId, dispatch]);
    const mapHotel = hotels.map((hotel) => {
        console.log('hotel', hotel)
    })
    if (loading) {
        return <Spin tip="Đang tải danh sách khách sạn..." />;
    }

    if (error) {
        const errorMessage = typeof error === 'string' ? error : error.message || 'Có lỗi xảy ra!';
        return <Alert message="Lỗi tải danh sách khách sạn!" description={errorMessage} type="error" showIcon />;
    }
    return (
        <div className="hotel-local-container">
            {hotels && hotels.map((hotel) => (
                <Row key={hotel._id} className="hotel-item">
                    <Col span={10} className="hotel-image-col">
                        <img
                            src={hotel.images?.[0]?.url || 'https://via.placeholder.com/300'}
                            alt={hotel.name || 'Hotel Image'}
                            className="hotel-image"
                        />
                    </Col>

                    <Col span={14} className="hotel-info-col">
                        <div className="hotel-name">
                            {hotel.name || 'Unnamed Hotel'}
                        </div>
                        <div className="hotel-rating">
                            <Rate className='item_star-hotel' allowHalf value={hotel.rating || 0} disabled />
                            {/* <span className="rating-text">{hotel.rating || 'N/A'}</span> */}
                        </div>

                        <div className="hotel-address">
                            {hotel.address || 'Address not available'}
                        </div>

                        <div className="hotel-amenities">
                            <ul>
                                {hotel.amenities?.length > 0 ? (
                                    hotel.amenities.map((amenity, index) => (
                                        <li key={index}>{amenity}</li>
                                    ))
                                ) : (
                                    <li>Không có tiện ích</li>
                                )}
                            </ul>
                        </div>

                        <div className="hotel-price">
                            Giá: {parseInt(hotel.price).toLocaleString('vi-VN')} đ
                        </div>

                        <Button className="primary">Xem chi tiết</Button>
                        <Button className="primary">Đặt ngay</Button>
                    </Col>
                </Row>
            ))}

            {hotels?.length === 0 && (
                <div className="no-hotels">
                    <h3>Không có khách sạn nào tại vị trí này.</h3>
                </div>
            )}
        </div>
    );
};

export default HotelLocal;

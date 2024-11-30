import React, { useEffect } from 'react'
import './RestaurantLocal.css'
import { useDispatch, useSelector } from 'react-redux';
import { getResByLocal } from '../../service/restaurantService';
import { Alert, Button, Col, Rate, Row, Spin } from 'antd';

const RestaurantLocal = ({ locationId }) => {
    const dispatch = useDispatch();
    console.log('locationId', locationId)
    const { restaurantByLocal, loading, error } = useSelector((state) => state.restaurantByLocal);
    console.log('restaurantByLocal', restaurantByLocal)
    useEffect(() => {
        if (locationId) {
            dispatch(getResByLocal({ locationId }));
        }
    }, [locationId, dispatch]);

    if (loading) {
        return <Spin tip="Đang tải danh sách nhà hàng..." />;
    }

    if (error) {
        const errorMessage = typeof error === 'string' ? error : error.message || 'Có lỗi xảy ra!';
        return <Alert message="Lỗi tải danh sách nhà hàng!" description={errorMessage} type="error" showIcon />;
    }

    return (
        <div className="restaurant-local-container">
            {restaurantByLocal && restaurantByLocal.length > 0 ? (
                restaurantByLocal.map((restaurant) => (
                    <Row key={restaurant._id} className="restaurant-item">
                        <Col span={10} className="restaurant-image-col">
                            <img
                                src={restaurant?.images?.[0]?.url || 'https://via.placeholder.com/300'}
                                alt={restaurant.name || 'Restaurant Image'}
                                className="restaurant-image"
                            />
                        </Col>

                        <Col span={14} className="restaurant-info-col">
                            <div className="restaurant-name">
                                {restaurant.name || 'Unnamed Restaurant'}
                            </div>

                            <div className="restaurant-rating">
                                <Rate
                                    className="item_star-restaurant"
                                    allowHalf
                                    value={restaurant.rating || 0}
                                    disabled
                                />
                            </div>

                            <div className="restaurant-address">
                                {restaurant.address || 'Address not available'}
                            </div>

                            <div className="restaurant-amenities">
                                Loại đồ ăn: {restaurant.type}
                            </div>

                            <div className="restaurant-price">
                                Giá: {parseInt(restaurant.price).toLocaleString('vi-VN')} đ
                            </div>

                            <Button className="primary">Xem chi tiết</Button>
                            <Button className="primary">Đặt ngay</Button>
                        </Col>
                    </Row>
                ))
            ) : (
                <div className="no-restaurantByLocal">
                    <h3>Không có nhà hàng nào tại vị trí này.</h3>
                </div>
            )}
        </div>
    );
}

export default RestaurantLocal

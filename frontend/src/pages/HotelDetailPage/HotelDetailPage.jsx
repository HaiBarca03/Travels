import React, { useEffect } from 'react';
import { Card, Row, Col, Tag, Rate, Divider, List, Avatar, Button, Spin, Alert } from 'antd';
import './HotelDetailPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelDetail } from '../../service/hotelService';

const HotelDetailPage = () => {
    const dispatch = useDispatch();
    const id = '67330010aae3694be7a14f56';
    const { hotelDetail, loading, error } = useSelector((state) => state.hotelDetail);

    console.log('hotelDetail', hotelDetail)
    useEffect(() => {
        dispatch(getHotelDetail(id));
    }, [id, dispatch]);


    if (loading) return <Spin tip="Đang tải chi tiết khách sạn..." />;
    if (error) return <Alert type="error" message="Lỗi tải thông tin khách sạn" description={error} showIcon />;

    if (!hotelDetail) {
        return <Alert type="info" message="Không tìm thấy thông tin khách sạn" showIcon />;
    }

    const {
        name,
        address,
        location = {},
        type,
        price,
        amenities = [],
        images = [],
        rating,
        reviews = [],
    } = hotelDetail;

    console.log('rating', rating)

    return (
        <div className="hotel-detail-container">
            <div className="nav_hotel">
                <p>
                    <span>Trang chủ</span>
                    <span>/</span>
                    <span>Khách sạn</span>
                    <span>/</span>
                    <span>Khách sạn Hà Nội</span>
                    <span>/</span>
                    <span>Chi tiết khách sạn</span>
                </p>
                <h4>{name}</h4>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card
                        className="hotel-image-card"
                        cover={
                            <img
                                alt={name}
                                className="img_ht"
                                src={images?.[0]?.url || 'https://via.placeholder.com/400'}
                            />
                        }
                        bordered={false}
                    >
                        <Card.Meta
                            avatar={
                                <Avatar
                                    src={location?.avatar?.url || 'https://via.placeholder.com/50'}
                                />
                            }
                            title={name}
                            description={`${type || 'Không xác định'} - ${address || 'Không có địa chỉ'}`}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card className="hotel-info-card" bordered={false}>
                        <h2>{name}</h2>
                        <p>
                            <strong>Địa chỉ:</strong> {address || 'Không có địa chỉ'}
                        </p>
                        <p>
                            <strong>Loại:</strong> {type || 'Không xác định'}
                        </p>
                        <p>
                            <strong>Giá:</strong> {price ? `${Number(price).toLocaleString()} VNĐ` : 'Không có thông tin'}
                        </p>
                        <p>
                            <strong>Đánh giá:</strong>
                            <Rate
                                className='item_rating-star'
                                disabled
                                allowHalf
                                defaultValue={rating}
                            />
                            <span> ({reviews?.length || 0} đánh giá)</span>
                        </p>

                        <Divider />
                        <h3>Tiện ích</h3>
                        {amenities.length > 0 ? (
                            amenities.map((amenity, index) => (
                                <Tag className="hotel-amenity-tag" color="blue" key={index}>
                                    {amenity}
                                </Tag>
                            ))
                        ) : (
                            <p>Không có tiện ích.</p>
                        )}
                        <Divider />
                        <h3>Thông tin địa điểm</h3>
                        <p>
                            <strong>Quốc gia:</strong> {location.country || 'Không có thông tin'}
                        </p>
                        <p>
                            <strong>Thành phố:</strong> {location.provinceCity || 'Không có thông tin'}
                        </p>
                    </Card>
                    <Button className="book-hotel-now">Đặt chỗ</Button>
                </Col>
            </Row>

            <Divider />

            {/* Other Images */}
            <h3>Hình ảnh khác</h3>
            <Row gutter={[16, 16]}>
                {images.length > 0 ? (
                    images.map((image) => (
                        <Col xs={24} sm={12} md={8} key={image.public_id}>
                            <Card
                                className="hotel-other-images"
                                cover={<img alt="Hotel Image" src={image.url || 'https://via.placeholder.com/300'} />}
                                bordered={false}
                            />
                        </Col>
                    ))
                ) : (
                    <p>Không có hình ảnh nào.</p>
                )}
            </Row>

            <Divider />

            {/* Reviews */}
            <h3>Đánh giá</h3>
            <List
                className="hotel-reviews-list"
                dataSource={reviews}
                renderItem={(review) => (
                    <List.Item>
                        <List.Item.Meta
                            title={review.author || 'Người dùng ẩn danh'}
                            description={review.comment || 'Không có nhận xét'}
                        />
                    </List.Item>
                )}
                locale={{ emptyText: 'Chưa có đánh giá nào.' }}
            />
        </div>
    );
};

export default HotelDetailPage;

import React, { useEffect } from 'react';
import { Badge, Button, Card, Col, Row, Empty, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getLocalTourist, getAllTourist } from '../../service/touristService';
import { useNavigate } from 'react-router-dom';

const CardTour = ({ locationId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { tours, loading, error } = useSelector((state) => state.localTourist);

    useEffect(() => {
        if (locationId) {
            dispatch(getLocalTourist(locationId));
        } else {
            dispatch(getAllTourist());
        }
    }, [locationId, dispatch]);


    const opneDetail = (id) => {
        navigate(`/tourist-detail/${id}`)
    }

    console.log('tours', tours.data)
    const mappTours = Array.isArray(tours?.data)
        ? tours.data.map((tour) => ({
            ...tour,
        }))
        : [];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <p>Đang tải dữ liệu, vui lòng đợi...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <p style={{ color: 'red' }}>Đã xảy ra lỗi: {error}</p>
            </div>
        );
    }

    return (
        <Row gutter={[16, 16]}>
            {mappTours.length ? (
                mappTours.map((tour) => (
                    <Row key={tour._id}>
                        <Col span={10}>
                            <Card
                                cover={
                                    <img
                                        alt="tour"
                                        src={tour.images?.[0]?.url || 'default-image.jpg'}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                }
                                actions={[<Button onClick={() => opneDetail(tour._id)} type="link">Xem chi tiết</Button>]}
                            >
                            </Card>
                        </Col>
                        <Col span={14}>
                            <Card>
                                <Badge.Ribbon>
                                    <Card.Meta
                                        title={tour.name}
                                        description={
                                            <>
                                                <p>{tour.description}</p>
                                                <p>
                                                    Mã tour: {tour._id} <br />
                                                    Thời gian: {tour.duration} <br />
                                                    Khởi hành: {tour.location?.provinceCity}, {tour.location?.country} <br />
                                                    Phương tiện: {tour.vehicle}
                                                </p>
                                                <h3 style={{ color: 'red' }}>Giá từ: {tour.price.toLocaleString()} ₫</h3>
                                            </>
                                        }
                                    />
                                </Badge.Ribbon>
                            </Card>
                        </Col>
                    </Row>
                ))
            ) : (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={<span>Không có tour nào tại địa điểm này</span>}
                    />
                    <Button
                        type="primary"
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '20px' }}
                    >
                        Tải lại
                    </Button>
                </div>
            )}
        </Row>
    );
};

export default CardTour;
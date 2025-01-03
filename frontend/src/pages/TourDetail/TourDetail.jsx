import React, { useEffect, useState } from 'react';
import { Button, Card, Typography, Col, Row, Rate, InputNumber, DatePicker, message, Carousel } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './TourDetail.css';
import { useParams } from 'react-router-dom';
import { getTourDetail } from '../../service/tourService';
import { useDispatch, useSelector } from 'react-redux';

const { Title, Paragraph } = Typography;

const TourDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [participants, setParticipants] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const { detailTour, loading, error } = useSelector((state) => state.tour);

    useEffect(() => {
        if (id) {
            dispatch(getTourDetail(id));
        }
    }, [id, dispatch]);

    const tourDetail = detailTour?.tour;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!tourDetail) return <div>No tour details found</div>;

    const allImages = tourDetail?.tour_places?.flatMap(place => place.images.map(img => img.url)) || [];

    const handleBooking = () => {
        if (selectedDate && participants <= tourDetail?.max_participants) {
            message.success('Tour booked successfully!');
        } else {
            message.error('Please select a date and ensure participants are within the limit.');
        }
    };

    return (
        <div className="tour-detail-page">
            <Row gutter={24} style={{ padding: '20px' }}>
                <Col span={16}>
                    <Carousel autoplay className="tour-carousel">
                        {allImages.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`tour-place-${index}`} className="tour-carousel-image" />
                            </div>
                        ))}
                    </Carousel>
                    <Card title={tourDetail.name} bordered={false}>
                        <p><strong>Ngày khởi hành: </strong>{tourDetail?.start_date ? new Date(tourDetail.start_date).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Thời gian: </strong>{tourDetail?.time}</p>
                        <p><strong>Nơi xuất phát: </strong>{tourDetail?.place_departure}</p>
                        <p><strong>Giá: </strong>{tourDetail?.price?.toLocaleString() || 'N/A'} VND</p>
                        <p><strong>Hoạt động: </strong>{tourDetail?.activities?.join(', ') || 'N/A'}</p>
                    </Card>
                    <div className="des_tourist">
                        <Title level={4} className="tit_des">Điểm nhấn của chương trình</Title>
                        <Paragraph className="detail_des">{tourDetail?.description}</Paragraph>
                    </div>
                    <Card>
                        <p>Các điểm đến</p>
                        {tourDetail?.tour_places?.map(place => (
                            <Card
                                key={place._id}
                                title={place.name}
                                bordered={false}
                                className="tour-place-card"
                                style={{ marginBottom: '10px' }}
                            >
                                <p>{place.description}</p>
                            </Card>
                        ))}
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Đặt tour này" bordered={false}>
                        <p><strong>Tên tour: </strong>{tourDetail?.name}</p>
                        <p><strong>Mã tour: </strong>{tourDetail?.code}</p>
                        <p><strong>Số lượng người tham gia: </strong>{tourDetail?.max_participants}</p>
                        <p><strong>Số người tham gia hiện tại: </strong>{tourDetail?.current_participants}</p>
                        <p><strong>Đánh giá: </strong><Rate value={tourDetail?.rating} disabled /></p>

                        <div style={{ marginBottom: '10px' }}>
                            <strong>Số lượng người tham gia: </strong>
                            <InputNumber
                                min={1}
                                max={tourDetail?.max_participants}
                                value={participants}
                                onChange={setParticipants}
                            />
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <strong>Chọn ngày tour: </strong>
                            <DatePicker onChange={(date) => setSelectedDate(date)} />
                        </div>

                        <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            size="large"
                            block
                            onClick={handleBooking}
                            disabled={participants > tourDetail?.max_participants || !selectedDate}
                        >
                            Đặt ngay
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TourDetail;

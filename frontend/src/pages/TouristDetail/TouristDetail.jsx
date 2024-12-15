import React, { useEffect } from 'react';
import './TouristDetail.css';
import { IoMdRestaurant } from 'react-icons/io';
import { CiLocationOn, CiBarcode } from 'react-icons/ci';
import { MdDateRange } from 'react-icons/md';
import { Row, Col, Typography, Button, DatePicker, Spin, Empty, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTouristDetail } from '../../service/touristService';
import { useParams } from 'react-router-dom';
import HotelLocal from '../../components/Hotel/HotelLocal';
import RestaurantLocal from '../../components/Restaurant/RestaurantLocal';

const { Title, Paragraph, Text } = Typography;

const TouristDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { toursDetail, loading, error } = useSelector((state) => state.touristDetail);
    useEffect(() => {
        if (id) {
            dispatch(getTouristDetail(id));
        }
    }, [id, dispatch]);

    if (loading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon />;
    }

    const mapTouristDetail = toursDetail?.data
    const mapImages = mapTouristDetail?.images

    console.log('mapImages', mapImages)

    const priceDetails = [
        { label: "Người lớn", description: "12 tuổi trở lên" },
        { label: "Trẻ em", description: "Từ 5 đến 11 tuổi" },
        { label: "Trẻ nhỏ", description: "Từ 2 - 4 tuổi" },
        { label: "Em bé", description: "Dưới 2 tuổi" },
    ];

    const calculatePrice = (index) => {
        const adultPrice = parseFloat(mapTouristDetail.price.replace(/\./g, "").replace(" đ", ""));
        if (index === 3) return 0; // Giá cho "Em bé" = 0
        return Math.round(adultPrice * Math.pow(0.75, index));
    };


    const tourInfo = [
        { icon: <IoMdRestaurant />, title: 'Ẩm thực', description: 'Buffet sáng, Theo thực đơn' },
        { icon: <CiLocationOn />, title: 'Điểm đến', description: 'Hạ Long, Yên Tử, Bình Liêu' },
        { icon: <MdDateRange />, title: 'Thời gian', description: '4 ngày 3 đêm' },
    ];

    return (
        <div className="main_detail-tourist">
            <div className="breadcrumb">
                <Text strong>Trang chủ</Text>
                <Text> / </Text>
                <Text strong>Du lịch Hà Nội</Text>
            </div>

            <Title level={2} className="title_tourist-page">
                Du lịch Hà Nội
            </Title>

            <Row gutter={[16, 16]}>
                {mapTouristDetail ? (
                    <>
                        <Col span={16}>
                            <div className="frame_img-detail">
                                <div className="image-list">
                                    {mapImages.map((itemImage, index) => (
                                        <img
                                            key={itemImage._id || index}
                                            src={itemImage.url}
                                            alt="Tour Destination"
                                            className="tour_image"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='descript_tourist'>
                                <div className="rating_tourist">
                                    <p style={{ marginLeft: "8px" }}>
                                        Đánh giá
                                    </p>
                                    <Rate
                                        className='item_rating-star'
                                        disabled
                                        allowHalf
                                        defaultValue={mapTouristDetail.rating}
                                    />
                                </div>
                                <div className='des_dt'>
                                    <span>{mapTouristDetail.description}</span>
                                </div>
                                <div className="list-action_tourist">
                                    <div className="list-action_tourist">
                                        <p>Các hoạt động thú vị</p>
                                        {mapTouristDetail.activities.map((item_action, index) => (
                                            <span key={index}>{item_action}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="date_start">
                                <Row className='wrapper_date'>
                                    <Col span={10}>
                                        <Title level={4} className="price_tit">
                                            Lịch khởi hành
                                        </Title>
                                        <DatePicker className="date_picker" />
                                    </Col>

                                    <Col span={14} className="price_tourist-detail">
                                        <Title level={4} className="price_tit">
                                            Giá tour
                                        </Title>
                                        <div className="frame_price">
                                            {priceDetails.map((item, index) => (
                                                <div key={index} className="item_price">
                                                    <div className="dt_people">
                                                        <Title level={5}>{item.label}</Title>
                                                        <p>{item.description}</p>
                                                    </div>
                                                    <Text strong className="price_people">
                                                        {index === 3
                                                            ? "0 đ"
                                                            : `${calculatePrice(index).toLocaleString("vi-VN")} đ`}
                                                    </Text>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Paragraph className="node_date">
                                Liên hệ tổng đài tư vấn: <Text strong>1900 1839</Text> từ 08:00 - 21:00. Vé máy bay không hoàn, không
                                đổi, không hủy, sai tên mất 100%.
                            </Paragraph>

                            <div className="des_tourist">
                                <Title level={4} className="tit_des">
                                    Điểm nhấn của chương trình
                                </Title>
                                <Paragraph className="detail_des">
                                    Đặt chân đến Quảng Ninh - tỉnh đầu tiên có 4 thành phố: Hạ Long, Móng Cái, Uông Bí và Cẩm Phả tạo nên
                                    thành phố du lịch không chỉ nổi tiếng về biển như Vịnh Hạ Long...
                                </Paragraph>
                            </div>

                            <div className="info_tour-dt">
                                <Title level={4} className="title_info-tour">
                                    Thông tin thêm về chuyến đi
                                </Title>
                                <div className="list_info-tour">
                                    {tourInfo.map((item, index) => (
                                        <div key={index} className="item_info-tour">
                                            {item.icon}
                                            <span level={5}>{item.title}</span>
                                            <p>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='hotel_tip'>
                                <h4>Khách sạn {mapTouristDetail.location.provinceCity}</h4>
                                <HotelLocal locationId={mapTouristDetail.location._id} />
                                <h4>Nhà hàng {mapTouristDetail.location.provinceCity}</h4>
                                <RestaurantLocal locationId={mapTouristDetail.location._id} />
                            </div>
                        </Col>

                        <Col span={8}>
                            <div className="info_pay">
                                <Text strong className="price_pay">
                                    {mapTouristDetail.price} ₫ / Khách
                                </Text>
                                <div className="code_tour">
                                    <CiBarcode /> Mã tour: <span>{mapTouristDetail._id}</span>
                                </div>
                                <div className="code_tour">
                                    <CiLocationOn /> Khởi hành: <span>{mapTouristDetail.location.provinceCity} - {mapTouristDetail.location.country}</span>
                                </div>
                                <div className="code_tour">
                                    <MdDateRange /> Ngày khởi hành: <span>26/12/2024</span>
                                </div>
                                <Button type="primary" className="book_now">
                                    Đặt ngay
                                </Button>
                            </div>
                        </Col>
                    </>) : (
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
        </div >
    );
};

export default TouristDetail;

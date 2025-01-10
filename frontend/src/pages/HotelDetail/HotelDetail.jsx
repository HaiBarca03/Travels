import React, { useEffect } from 'react'
import { Rate, Card, Button, Carousel } from 'antd'
import './HotelDetail.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllHotel } from '../../service/hotelService'
import HotelFrame from '../../components/Hotel/HotelFrame'

const HotelDetail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { hotel, isLoading, error } = useSelector((state) => state.hotel)
  const dispatch = useDispatch()
  if (!state?.hotelDetail) {
    return (
      <div className="restaurant-container">
        <p>Không tìm thấy thông tin nhà hàng.</p>
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
      </div>
    )
  }

  useEffect(() => {
    dispatch(getAllHotel())
  }, [dispatch])
  const data = hotel?.data
  const handelBooking = (id) => {
    navigate('/hotel/booking', { state: { hotelId: id } })
  }

  const {
    _id,
    name,
    address,
    location,
    type,
    price,
    amenities,
    images,
    rating,
    description
  } = state?.hotelDetail

  return (
    <>
      <div className="hotel-container-dt">
        <Card className="hotel-card">
          <Carousel autoplay className="hotel-slider">
            {images.map((img) => (
              <div key={img._id}>
                <img src={img.url} alt="Hotel" className="hotel-slider-image" />
              </div>
            ))}
          </Carousel>
          <div className="hotel-content">
            <div className="hotel-details">
              <h1 className="hotel-name">{name}</h1>
              <p className="hotel-type">{type}</p>
              <p className="hotel-address">
                Địa chỉ: {address}, {location.provinceCity}, {location.country}
              </p>
              <div className="hotel-rating">
                <Rate value={rating} disabled />
                <span className="rating-text">{rating} sao</span>
              </div>
              <p className="hotel-price">Giá trung bình: {price} VND / đêm</p>
              <p className="hotel-type">{description}</p>
              <div className="hotel-amenities">
                <h3>Tiện nghi:</h3>
                <ul>
                  {amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hotel-actions">
              <Button
                type="primary"
                className="booking-button"
                onClick={() => handelBooking(_id)}
              >
                Đặt phòng
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div className="more-hotel-dt">
        <h5 className="title_hotel-def">Khách sạn khác</h5>
        {!isLoading && !error && data && <HotelFrame data={data} />}
      </div>
    </>
  )
}

export default HotelDetail

import React from 'react'
import { Button, Rate, Card } from 'antd'
import './RestaurantDetail.css'
import { useLocation, useNavigate } from 'react-router-dom'
import OddTourist from '../../components/Odd-tourist/Odd-tourist'

const RestaurantDetail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  if (!state?.restaurantDetail) {
    return (
      <div className="restaurant-container">
        <p>Không tìm thấy thông tin nhà hàng.</p>
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
      </div>
    )
  }

  const handelBooking = (id) => {
    navigate('/restaurant/booking', { state: { restaurantId: id } })
  }

  const {
    _id,
    name,
    address,
    location,
    type,
    price,
    images,
    rating,
    decription
  } = state?.restaurantDetail

  return (
    <>
      <div className="restaurant-dt-container">
        <Card className="restaurant-card">
          <div className="restaurant-content">
            <div className="restaurant-main">
              <div className="restaurant-header">
                <img
                  src={images[0].url}
                  alt={name}
                  className="restaurant-image"
                />
              </div>
              <div className="des-res-dt">
                <p className="des-res-dt-text">{decription}</p>
              </div>
            </div>

            <div className="restaurant-sidebar">
              <div className="restaurant-details">
                <h1 className="restaurant-name">{name}</h1>
                <div className="restaurant-rating">
                  <Rate value={rating} disabled />
                  <span className="rating-text">{rating} sao</span>
                </div>
                {/* <p className="restaurant-description">{decription}</p> */}
                <p className="restaurant-type">{type}</p>
                <p className="restaurant-address">
                  Địa chỉ: {address}, {location.provinceCity},{' '}
                  {location.country}
                </p>
                <div className="sidebar-info">
                  <p className="sidebar-price">Giá trung bình: {price} VND</p>
                </div>
              </div>
              <div className="sidebar-actions">
                <Button
                  type="primary"
                  className="booking-button"
                  onClick={() => handelBooking(_id)}
                >
                  Đặt nhà hàng
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="deff-tours">
        <h5>Tour lẻ dành cho bạn</h5>
        <OddTourist />
      </div>
    </>
  )
}

export default RestaurantDetail

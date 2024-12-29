import React from 'react'
import { Button, Rate, Card } from 'antd'
import './RestaurantDetail.css'
import { useLocation, useNavigate } from 'react-router-dom'

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

  const { name, address, location, type, price, images, rating, description } =
    state?.restaurantDetail

  return (
    <div className="restaurant-container">
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
            <div className="restaurant-details">
              <h1 className="restaurant-name">{name}</h1>
              <div className="restaurant-rating">
                <Rate value={rating} disabled />
                <span className="rating-text">{rating} sao</span>
              </div>
              <p className="restaurant-description">{description}</p>
              <p className="restaurant-type">{type}</p>
              <p className="restaurant-address">
                Địa chỉ: {address}, {location.provinceCity}, {location.country}
              </p>
            </div>
          </div>

          <div className="restaurant-sidebar">
            <div className="sidebar-info">
              <p className="sidebar-price">Giá trung bình: {price} VND</p>
            </div>
            <div className="sidebar-actions">
              <Button type="primary" className="booking-button">
                Đặt nhà hàng
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default RestaurantDetail

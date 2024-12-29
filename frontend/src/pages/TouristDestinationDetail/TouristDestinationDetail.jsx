import React from 'react'
import { Card, Rate, Button, Carousel } from 'antd'
import './TouristDestinationDetail.css'
import { useLocation, useNavigate } from 'react-router-dom'

const TouristDestinationDetail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  console.log('state?.toursDetail:', state?.toursDetail)
  if (!state?.toursDetail) {
    return (
      <div className="tourist-container">
        <p>Không tìm thấy thông tin điểm du lịch.</p>
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
      </div>
    )
  }

  const { name, description, location, images, rating, price, activities } =
    state?.toursDetail.data

  return (
    <div className="tourist-container">
      <Card className="tourist-card">
        <div className="tourist-content">
          {/* Image slider on top */}
          <div className="tourist-slider">
            <Carousel autoplay>
              {images.map((image) => (
                <div key={image._id}>
                  <img src={image.url} alt={name} className="tourist-image" />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Information section */}
          <div className="tourist-detail">
            <div className="tourist-left">
              <h2>{name}</h2>
              <p>{description}</p>
              <p>
                <strong>Địa chỉ:</strong> {location.provinceCity},{' '}
                {location.country}
              </p>
              <p>
                <strong>Hoạt động:</strong> {activities.join(', ')}
              </p>
              <p>
                <strong>Giá:</strong> {price} VND
              </p>
              <div className="tourist-rating">
                <Rate disabled defaultValue={rating} />
                <span>{rating} sao</span>
              </div>
            </div>

            {/* Sidebar */}
            <div className="tourist-sidebar">
              <Button type="primary" className="tourist-book-button">
                Đặt vé
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TouristDestinationDetail

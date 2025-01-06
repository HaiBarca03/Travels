import React from 'react'
import { Card, Rate, Button, Carousel } from 'antd'
import './TouristDestinationDetail.css'
import { useLocation, useNavigate } from 'react-router-dom'
import FeedbackSection from '../../components/Feedback/Feedback'

const TouristDestinationDetail = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  if (!state?.toursDetail) {
    return (
      <div className="tourist-container">
        <p>Không tìm thấy thông tin điểm du lịch.</p>
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
      </div>
    )
  }

  const handelBooking = (id) => {
    if (id) {
      navigate('/tourist/booking', { state: { touristId: id } })
    } else {
      message.error(
        'Please select a date and ensure participants are within the limit.'
      )
    }
  }

  const {
    _id,
    name,
    description,
    location,
    images,
    rating,
    price,
    activities
  } = state?.toursDetail.data

  return (
    <div className="tourist-container">
      <Card className="tourist-card">
        <div className="tourist-content">
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
              <Button
                type="primary"
                className="tourist-book-button"
                onClick={() => handelBooking(_id)}
              >
                Đặt vé
              </Button>
            </div>
          </div>
        </div>
        <FeedbackSection data={{ tourist_id: _id }} />
      </Card>
    </div>
  )
}

export default TouristDestinationDetail

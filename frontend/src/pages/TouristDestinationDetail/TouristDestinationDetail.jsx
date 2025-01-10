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
      <div className="tourist-container-dt">
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
    <Card className="tourist-card">
      <div className="tourist-container-dt">
        <div className="tourist-card">
          <div className="tourist-content">
            <div className="tourist-slider">
              <Carousel autoplay>
                {images.map((image) => (
                  <div key={image._id}>
                    <img src={image.url} alt={name} className="tourist-image" />
                  </div>
                ))}
              </Carousel>
              <div className="tourist-dt-info">
                <p>
                  <strong>Hoạt động:</strong> {activities.join(', ')}
                </p>
                <p>{description}</p>
              </div>
            </div>

            <div className="tourist-detail">
              <div className="tourist-left">
                <h2>{name}</h2>
                <p>
                  <strong>Địa chỉ:</strong> {location.provinceCity},{' '}
                  {location.country}
                </p>
                <p className="price-tourist-dt">
                  <strong>Giá:</strong> {price} VND
                </p>
                <div className="tourist-rating">
                  {rating}/5
                  <Rate
                    className="rate_start-dt"
                    disabled
                    defaultValue={rating}
                  />
                </div>
              </div>

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
        </div>
      </div>

      <FeedbackSection data={{ tourist_id: _id }} />
    </Card>
  )
}

export default TouristDestinationDetail

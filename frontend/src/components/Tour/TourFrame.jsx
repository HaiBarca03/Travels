import React, { useEffect } from 'react'
import './TourFrame.css'
import { useNavigate } from 'react-router-dom'
import { Rate } from 'antd'

const TourFrame = ({ data }) => {
  console.log(data)
  const navigate = useNavigate()
  const handleOpenTour = (id) => {
    navigate(`/tour-detail/${id}`)
  }

  const handelBooking = (id) => {
    navigate('tour/booking')
  }
  return (
    <div className="tour-deals">
      {data?.tours?.map((tour) => (
        <div
          onClick={() => handleOpenTour(tour._id)}
          key={tour._id}
          className="tour-deals-card"
        >
          <div className="tour-deals-header">
            {tour?.tour_places.length > 0 ? (
              <img
                key={tour.tour_places[0]._id}
                src={tour.tour_places[0].images[0]?.url}
                alt={tour.tour_places[0].name}
                className="tour-deals-image"
              />
            ) : null}
            <div className="tour-deals-timer">Thời gian: {tour.time}</div>
          </div>
          <div className="tour-deals-body">
            {/* <h3 className="tour-deals-title">{tour.name}</h3> */}
            <div className="tour-deals-places">
              <p>
                {tour.tour_places.map((place) => (
                  <span key={place._id} className="tour-deals-place">
                    {place.name} -
                  </span>
                ))}
              </p>
            </div>
            <p className="tour-deals-departure">
              Khởi hành từ: <span>{tour.place_departure}</span>
            </p>
            <p className="tour-deals-date">
              Ngày khởi hành:{' '}
              <span>{new Date(tour.start_date).toLocaleDateString()}</span>
            </p>
            <p className="tour-deals-duration">Thời gian: {tour.time}</p>
            {/* <p className="tour-deals-seats">
              Số chỗ còn nhận:{' '}
              {tour.max_participants - tour.current_participants}
            </p> */}
            <div className="tour-deals-price">
              <div className="tour-rating">
                <Rate allowHalf defaultValue={tour.rating} disabled />
              </div>
              <div className="tour-deals-price-new">{tour.price} VNĐ</div>
            </div>
          </div>
          <div className="tour-deals-footer">
            <button
              className="tour-deals-button"
              onClick={(e) => {
                e.stopPropagation()
                handelBooking(tour._id)
              }}
            >
              Đặt ngay
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TourFrame

import React, { useEffect } from 'react'
import './TourFrame.css'
import { useNavigate } from 'react-router-dom'

const TourFrame = ({ data }) => {
  console.log('data:', data)
  const navigate = useNavigate()
  const handleOpenTour = (id) => {
    navigate(`/tour-detail/${id}`)
  }
  return (
    <div className="tour-deals">
      {data?.tours?.map((tour) => (
        <div
          onClick={() => handleOpenTour(tour._id)}
          key={tour._id}
          className="tour-card"
        >
          <div className="tour-header">
            <img
              src="https://demobuffalo.webtravel.vn/files/images/cruise/Syrena/1.PNG"
              alt={tour.name}
              className="tour-image"
            />
            <div className="tour-timer">Thời gian: {tour.time}</div>
          </div>
          <div className="tour-body">
            <h3 className="tour-title">{tour.name}</h3>
            <div className="tour-places">
              <p>
                {tour.tour_places.map((place) => (
                  <span key={place._id}>{place.name} - </span>
                ))}
              </p>
            </div>
            <p className="tour-code">Mã Tour: {tour.code}</p>
            <p className="tour-departure">
              Khởi hành từ: <span>{tour.place_departure}</span>
            </p>
            <p className="tour-date">
              Ngày khởi hành:{' '}
              <span>{new Date(tour.start_date).toLocaleDateString()}</span>
            </p>
            <p className="tour-duration">Thời gian: {tour.time}</p>
            <p className="tour-seats">
              Số chỗ còn nhận:{' '}
              {tour.max_participants - tour.current_participants}
            </p>
            <div className="tour-price">
              <span className="tour-price-new">{tour.price} VNĐ</span>
            </div>
          </div>
          <div className="tour-footer">
            <button className="tour-button">Đặt ngay</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TourFrame

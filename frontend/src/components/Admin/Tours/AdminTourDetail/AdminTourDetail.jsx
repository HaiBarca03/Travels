import React, { useEffect } from 'react'
import './AdminTourDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTourDetail } from '../../../../service/tourService'

const AdminTourDetail = (tourDetail) => {
  const dispatch = useDispatch()
  const { detailTour } = useSelector((state) => state.tour)
  const tourId = tourDetail.tour._id
  const tour = tourDetail.tour
  useEffect(() => {
    dispatch(getTourDetail(tourId))
  }, [dispatch, tourId])
  const tourdt = detailTour.tour
  return (
    <div className="tour-details">
      <div className="tour-header">
        <h1 className="tour-name">{tour.name}</h1>
        <p className="tour-code">
          <strong>Code:</strong> {tour.code}
        </p>
      </div>
      <div className="tour-body">
        <div className="tour-section">
          <p className="tour-description">
            <strong>Description:</strong> {tour.description}
          </p>
          <p className="tour-activities">
            <strong>Activities:</strong> {tour.activities?.join(', ')}
          </p>
        </div>
        <div className="tour-section">
          <p className="tour-price">
            <strong>Price:</strong> {tour.price} VND
          </p>
          <p className="tour-start-date">
            <strong>Start Date:</strong>{' '}
            {new Date(tour.start_date).toLocaleDateString()}
          </p>
          <p className="tour-departure">
            <strong>Departure Place:</strong> {tour.place_departure}
          </p>
        </div>
        <div className="tour-section">
          <p className="tour-duration">
            <strong>Duration:</strong> {tour.time}
          </p>
          <p className="tour-max-participants">
            <strong>Max Participants:</strong> {tour.max_participants}
          </p>
          <p className="tour-current-participants">
            <strong>Current Participants:</strong> {tour.current_participants}
          </p>
          <p className="tour-rating">
            <strong>Rating:</strong> {tour.rating}
          </p>
        </div>
      </div>

      <h2 className="tour-places-title">Tour Places</h2>
      {tourdt?.tour_places?.map((place) => (
        <div key={place._id} className="tour-place">
          <div className="tour-place-info-ct">
            <h3 className="place-name">{place.name}</h3>
            <p className="place-description">{place.description}</p>
            <p className="place-location">
              <strong>Location ID:</strong> {place.location}
            </p>
            <p className="place-activities">
              <strong>Activities:</strong> {place.activities?.join(', ')}
            </p>
            <p className="place-rating">
              <strong>Rating:</strong> {place.rating}
            </p>
            <p className="place-price">
              <strong>Price:</strong> {place.price} VND
            </p>
          </div>
          <div className="place-images">
            <h4>Images</h4>
            {place.images?.map((image) => (
              <img
                key={image._id}
                src={image.url}
                alt={place.name}
                className="place-image"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminTourDetail

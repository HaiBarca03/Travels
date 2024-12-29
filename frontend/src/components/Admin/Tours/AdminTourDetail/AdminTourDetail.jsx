import React, { useEffect } from 'react'
import './AdminTourDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTourDetail } from '../../../../service/tourService'

const AdminTourDetail = (selectedTour) => {
  const id = selectedTour.tour
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTourDetail(id))
  }, [id, dispatch])
  const { detailTour, loading, error } = useSelector((state) => state.tour)
  const tour = detailTour?.tour
  console.log('tour', tour)
  return (
    <div className="tour-details">
      <h1 className="tour-name">{tour.name}</h1>
      <p className="tour-code">
        <strong>Code:</strong> {tour.code}
      </p>
      <p className="tour-description">
        <strong>Description:</strong> {tour.description}
      </p>
      <p className="tour-activities">
        <strong>Activities:</strong> {tour.activities.join(', ')}
      </p>
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
      <p className="tour-duration">
        <strong>Duration:</strong> {tour.time}
      </p>
      <p className="tour-max-participants">
        <strong>Max Participants:</strong> {tour.max_participants}
      </p>
      <p className="tour-current-participants">
        <strong>Current Participants:</strong> {tour.current_participants}
      </p>
      <p className="tour-guide-id">
        <strong>Guide ID:</strong> {tour.guide_id}
      </p>
      <p className="tour-rating">
        <strong>Rating:</strong> {tour.rating}
      </p>
      <p className="tour-reviews">
        <strong>Reviews:</strong> {tour.reviews.join(', ')}
      </p>

      <h2 className="tour-places-title">Tour Places</h2>
      {tour.tour_places.map((place) => (
        <div key={place._id} className="tour-place">
          <h3 className="place-name">{place.name}</h3>
          <p className="place-description">{place.description}</p>
          <p className="place-location">
            <strong>Location ID:</strong> {place.location}
          </p>
          <p className="place-activities">
            <strong>Activities:</strong> {place.activities.join(', ')}
          </p>
          <p className="place-rating">
            <strong>Rating:</strong> {place.rating}
          </p>
          <p className="place-price">
            <strong>Price:</strong> {place.price} VND
          </p>
          <div className="place-images">
            <h4>Images</h4>
            {place.images.map((image) => (
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

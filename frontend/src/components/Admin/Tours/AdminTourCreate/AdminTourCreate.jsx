import React, { useEffect, useState } from 'react'
import './AdminTourCreate.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTourist } from '../../../../service/touristService'
import { addTour } from '../../../../service/adminService'

const AdminTourCreate = () => {
  const [tourData, setTourData] = useState({
    name: '',
    tour_places: [],
    description: '',
    activities: '',
    start_date: '',
    place_departure: '',
    time: '',
    max_participants: '',
    guide_id: ''
  })

  const { tours } = useSelector((state) => state.localTourist)
  const allTour = tours?.data || []

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllTourist())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTourData({
      ...tourData,
      [name]: value
    })
  }

  const handleCheckboxChange = (tourId) => {
    setTourData((prevData) => {
      const updatedPlaces = prevData.tour_places.includes(tourId)
        ? prevData.tour_places.filter((id) => id !== tourId)
        : [...prevData.tour_places, tourId]
      return { ...prevData, tour_places: updatedPlaces }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addTour({ data: tourData }))
      .unwrap()
      .then(() => {
        alert('Tour created successfully!')
      })
      .catch((error) => {
        alert(`Error: ${error}`)
      })
  }

  return (
    <div className="admin-tour-create">
      <h2>Tạo mới tour</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={tourData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tour Places (IDs):</label>
          <input
            type="text"
            name="tour_places"
            value={tourData.tour_places.join(', ')}
            readOnly
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={tourData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Activities (comma separated):</label>
          <input
            type="text"
            name="activities"
            value={tourData.activities}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={tourData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Place of Departure:</label>
          <input
            type="text"
            name="place_departure"
            value={tourData.place_departure}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (e.g., 7 days):</label>
          <input
            type="text"
            name="time"
            value={tourData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Max Participants:</label>
          <input
            type="number"
            name="max_participants"
            value={tourData.max_participants}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Guide ID:</label>
          <input
            type="text"
            name="guide_id"
            value={tourData.guide_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Tour</button>
      </form>

      <h5>Danh sách địa điểm</h5>
      <div className="tour-list">
        {allTour.length > 0 ? (
          allTour.map((tour) => (
            <div className="tour-item" key={tour.id}>
              <img
                src={tour.image || 'default-image.png'}
                alt={tour.name}
                className="tour-image"
              />
              <h5>Tên tour: {tour.name}</h5>
              <h5>Mã tour: {tour._id}</h5>
              <h5>Giá: {tour.price ? `${tour.price} VND` : 'Không có giá'}</h5>
              <input
                type="checkbox"
                checked={tourData.tour_places.includes(tour._id)}
                onChange={() => handleCheckboxChange(tour._id)}
              />
            </div>
          ))
        ) : (
          <p>Không có địa điểm nào được tìm thấy.</p>
        )}
      </div>
    </div>
  )
}

export default AdminTourCreate

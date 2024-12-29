import React, { useState } from 'react'
import { Empty } from 'antd'
import './LocationFrame.css'
import { getLocalTourist } from '../../service/touristService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const LocationFrame = ({ locations }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!locations || locations.length === 0) {
    return (
      <div className="empty-container">
        <Empty description="Không có địa điểm nào" />
      </div>
    )
  }
  const handleLocation = (id) => {
    if (id) {
      dispatch(getLocalTourist(id)).then((response) => {
        const searchTour = response?.payload?.data || []
        navigate('/search/tourist-destination', { state: { searchTour } })
      })
    }
  }
  return (
    <div className="location-list">
      {locations.map((location) => (
        <div
          key={location._id}
          onClick={() => handleLocation(location._id)}
          className="image-container"
        >
          <img
            src={location.avatar.url}
            alt={location.provinceCity}
            className="image"
          />
          <div className="overlay">
            <h2 className="title">{location.provinceCity}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocationFrame

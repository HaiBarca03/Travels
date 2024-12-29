import React, { useEffect } from 'react'
import './LocationPage.css'
import LocationFrame from '../../components/Location/LocationFrame'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLocal } from '../../service/localService'
import { Spin, Alert } from 'antd'

const LocationPage = () => {
  const { locations, isLoading, error } = useSelector((state) => state.local)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllLocal())
  }, [dispatch])

  const listLocation = locations?.data

  return (
    <div className="location_main-page">
      <h4>Các địa điểm du lịch</h4>

      {isLoading && (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert
          message="Có lỗi xảy ra"
          description={error}
          type="error"
          showIcon
        />
      )}

      {!isLoading && !error && listLocation && (
        <LocationFrame locations={listLocation} />
      )}
    </div>
  )
}

export default LocationPage

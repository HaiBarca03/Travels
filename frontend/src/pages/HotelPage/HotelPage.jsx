import React, { useEffect } from 'react'
import HotelFrame from '../../components/Hotel/HotelFrame'
import { useDispatch, useSelector } from 'react-redux'
import { getAllHotel } from '../../service/hotelService'
import { Spin, Alert } from 'antd'
import './HotelPage.css'

const HotelPage = () => {
  const { hotel, isLoading, error } = useSelector((state) => state.hotel)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllHotel())
  }, [dispatch])
  const data = hotel?.data

  return (
    <div className="hotel_main-page">
      <h4>Tất cả khách sạn</h4>
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
      {!isLoading && !error && data && <HotelFrame data={data} />}
    </div>
  )
}

export default HotelPage

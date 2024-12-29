import React, { useEffect } from 'react'
import './RestaurantPage.css'
import RestaurantFrame from '../../components/Restaurant/RestaurantFrame'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurant } from '../../service/restaurantService'
import { Spin, Alert } from 'antd'

const RestaurantPage = () => {
  const { allRestaurant, isLoading, error } = useSelector(
    (state) => state.restaurant
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRestaurant())
  }, [dispatch])
  const restaurantData = allRestaurant?.data
  return (
    <div className="restaurant_main-page">
      <h4>Tất cả nhà hàng</h4>
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

      {!isLoading && !error && restaurantData && (
        <RestaurantFrame data={restaurantData} />
      )}
    </div>
  )
}

export default RestaurantPage

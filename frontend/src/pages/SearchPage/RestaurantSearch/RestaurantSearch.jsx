import React from 'react'
import { useLocation } from 'react-router-dom'
import RestaurantFrame from '../../../components/Restaurant/RestaurantFrame'

const RestaurantSearch = () => {
  const location = useLocation()
  const searchData = Array.isArray(location.state?.searchRes)
    ? location.state.searchRes
    : []
  console.log('Search Data:', searchData)

  return (
    <div>
      {searchData.length > 0 ? (
        <RestaurantFrame data={searchData} />
      ) : (
        <p>Không có dữ liệu được tìm thấy.</p>
      )}
    </div>
  )
}

export default RestaurantSearch

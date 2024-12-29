import React from 'react'
import { useLocation } from 'react-router-dom'
import TouristDestinationFrame from '../../../components/TouristDestination/TouristDestinationFrame'

const TouristSearch = () => {
  const location = useLocation()
  const searchTour = location.state?.searchTour || []

  return (
    <div>
      {searchTour.length > 0 ? (
        <TouristDestinationFrame data={searchTour} />
      ) : (
        <p>Không có dữ liệu được tìm thấy.</p>
      )}
    </div>
  )
}

export default TouristSearch

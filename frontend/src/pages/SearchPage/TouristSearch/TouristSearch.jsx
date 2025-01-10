import React from 'react'
import { useLocation } from 'react-router-dom'
import TouristDestinationFrame from '../../../components/TouristDestination/TouristDestinationFrame'
import './TouristSearch.css'

const TouristSearch = () => {
  const location = useLocation()
  const searchTour = location.state?.searchTour || []

  return (
    <div className="search-page-tourist">
      <h3 className="search-page-tourist-title">Kết quả tìm kiếm tour</h3>
      {searchTour.length > 0 ? (
        <TouristDestinationFrame data={searchTour} />
      ) : (
        <p>Không có dữ liệu được tìm thấy.</p>
      )}
    </div>
  )
}

export default TouristSearch

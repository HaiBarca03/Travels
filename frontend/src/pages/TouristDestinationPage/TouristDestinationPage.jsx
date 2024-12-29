import React, { useEffect } from 'react'
import TouristDestinationFrame from '../../components/TouristDestination/TouristDestinationFrame'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTourist } from '../../service/touristService'
import './TouristDestinationPage.css'

const TouristDestinationPage = () => {
  const { tours } = useSelector((state) => state.localTourist)
  const allTour = tours?.data || []

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllTourist())
  }, [dispatch])

  return (
    <div className="tourist_main-page">
      <h4>Điểm du lịch</h4>
      <TouristDestinationFrame data={allTour} />
    </div>
  )
}

export default TouristDestinationPage

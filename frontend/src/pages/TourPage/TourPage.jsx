import React, { useEffect } from 'react'
import TourFrame from '../../components/Tour/TourFrame'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTour } from '../../service/tourService'
import './TourPage.css'

const TourPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allTour, isLoading, error } = useSelector((state) => state.tour)
  console.log('allTour:', allTour)
  useEffect(() => {
    dispatch(getAllTour())
  }, [dispatch])
  return (
    <div className="tour_page-main">
      <h4>Tất cả chuyển đi</h4>
      <TourFrame data={allTour} />
    </div>
  )
}

export default TourPage

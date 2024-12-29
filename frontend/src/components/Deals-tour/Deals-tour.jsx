import React, { useEffect } from 'react'
import './Deals-tour.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTour } from '../../service/tourService'
import TourFrame from '../Tour/TourFrame'

const DealsTour = () => {
  const dispatch = useDispatch()
  const { allTour } = useSelector((state) => state.tour)
  useEffect(() => {
    dispatch(getAllTour())
  }, [dispatch])
  return (
    <div className="tour-deals">
      <TourFrame data={allTour} />
    </div>
  )
}

export default DealsTour

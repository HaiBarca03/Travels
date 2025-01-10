import React, { useEffect } from 'react'
import './Deals-tour.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTourHome } from '../../service/tourService'
import TourFrame from '../Tour/TourFrame'

const DealsTour = () => {
  const dispatch = useDispatch()
  const { allTourHome } = useSelector((state) => state.tour)
  useEffect(() => {
    dispatch(getAllTourHome())
  }, [dispatch])
  return <TourFrame data={allTourHome} />
}

export default DealsTour

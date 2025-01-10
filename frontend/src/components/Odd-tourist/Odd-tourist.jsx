import React, { useEffect } from 'react'
import './Odd-tourist.css'
import { useDispatch, useSelector } from 'react-redux'
import TouristDestinationFrame from '../TouristDestination/TouristDestinationFrame'
import { getAllTouristHome } from '../../service/touristService'

const OddTourist = () => {
  const dispatch = useDispatch()
  const { toursHome } = useSelector((state) => state.localTourist)
  useEffect(() => {
    dispatch(getAllTouristHome())
  }, [dispatch])
  return <TouristDestinationFrame data={toursHome} />
}

export default OddTourist

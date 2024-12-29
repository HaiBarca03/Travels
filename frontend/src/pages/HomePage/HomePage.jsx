import React from 'react'
import './HomePage.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import DealsTour from '../../components/Deals-tour/Deals-tour'
import LocationFrame from '../../components/Location/LocationFrame'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { locations } = useSelector((state) => state.local)
  const listLocation = locations?.data
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <h3 className="title"> Location</h3>
      <LocationFrame locations={listLocation} />
      <h3 className="title">Deals Tour</h3>
      <DealsTour />
    </div>
  )
}

export default HomePage

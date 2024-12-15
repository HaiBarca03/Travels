import React from 'react'
import './HomePage.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Location from '../../components/Location/Location'
import { useNavigate } from 'react-router-dom'
import DealsTour from '../../components/Deals-tour/Deals-tour'
import TravelTipsBanner from '../../components/TravelTipsBanner/TravelTipsBanner'

const HomePage = () => {
    const navigate = useNavigate()
    const all = () => {
        navigate('/all-tourist-attraction')
    }
    return (
        <div>
            <Navbar />
            <Location />
            <p onClick={all}>
                all
            </p>
            <DealsTour />
            <TravelTipsBanner />
        </div>
    )
}

export default HomePage

import React from 'react'
import './HomePage.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Location from '../../components/Location/Location'

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Location />
        </div>
    )
}

export default HomePage

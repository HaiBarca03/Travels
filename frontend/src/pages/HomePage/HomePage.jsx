import React from 'react'
import './HomePage.css'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Location from '../../components/Location/Location'
import { useNavigate } from 'react-router-dom'

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
        </div>
    )
}

export default HomePage

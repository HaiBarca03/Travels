import React from 'react'
import './HomePage.css'
import { FaAnglesRight } from 'react-icons/fa6'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import DealsTour from '../../components/Deals-tour/Deals-tour'
import LocationFrame from '../../components/Location/LocationFrame'
import { useSelector } from 'react-redux'
import QuickBooking from '../../components/UIHome/QuickBooking/QuickBooking'
import Why from '../../components/UIHome/Why/Why'
import OddTourist from '../../components/Odd-tourist/Odd-tourist'
import FollowHH from '../../components/UIHome/FollowHH/FollowHH'

const HomePage = () => {
  const { locations } = useSelector((state) => state.local)
  const listLocation = locations?.data
  const navigate = useNavigate()
  const openTourPage = () => {
    navigate('/tour')
  }
  const openTouristPage = () => {
    navigate('/tourist-destination')
  }
  const openLocationPage = () => {
    navigate('/location')
  }
  return (
    <div>
      <Navbar />
      <Why />
      <QuickBooking />
      <div className="best_price-tour">
        <div className="title_best-price-tout">
          <div className="left-title-best-price">
            <h3>Tour giá tốt</h3>
            <h5>Có hơn 1000 tour đa dạng giá hời có hạn</h5>
          </div>
          <p className="right-title-best-price" onClick={() => openTourPage()}>
            <span>Xem thêm</span> <FaAnglesRight />{' '}
          </p>
        </div>
        <DealsTour />
      </div>
      <div className="best_price-tour">
        <div className="title_best-price-tout">
          <div className="left-title-best-price">
            <h3>Điểm đến hấp dẫn</h3>
            <h5>Có hơn 100 địa điểm hấp dẫn nhất thế giới</h5>
          </div>
          <p
            className="right-title-best-price"
            onClick={() => openLocationPage()}
          >
            <span>Xem thêm</span> <FaAnglesRight />{' '}
          </p>
        </div>
        <LocationFrame locations={listLocation} />
      </div>
      <div className="best_price-tour">
        <div className="title_best-price-tout">
          <div className="left-title-best-price">
            <h3>Tour lẻ ưu đãi</h3>
            <h5>Có hơn 1000 tour đa dạng giá hời có hạn</h5>
          </div>
          <p
            className="right-title-best-price"
            onClick={() => openTouristPage()}
          >
            <span>Xem thêm</span> <FaAnglesRight />{' '}
          </p>
        </div>
        <OddTourist />
      </div>
      <FollowHH />
    </div>
  )
}

export default HomePage

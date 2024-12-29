import React, { useEffect, useState } from 'react'
import './SearchHotel.css'
import { CiLocationOn } from 'react-icons/ci'
import { BsCalendar2Date } from 'react-icons/bs'
import { FaRestroom } from 'react-icons/fa'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLocal } from '../../../service/localService'
import { getHotelByLocal } from '../../../service/hotelService'

const SearchHotel = () => {
  const { locations, isLoading, error } = useSelector((state) => state.local)
  const { hotels } = useSelector((state) => state.hotelByLocal)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllLocal())
  }, [dispatch])

  const [selectedLocation, setSelectedLocation] = useState('')
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value)
  }

  const handleSearch = () => {
    console.log('selectedLocation', selectedLocation)
    if (selectedLocation) {
      dispatch(getHotelByLocal(selectedLocation))
      console.log('selectedLocation', selectedLocation)
    }
  }

  useEffect(() => {
    if (hotels) {
      console.log('Hotels:', hotels)
    }
  }, [hotels])

  const [counts, setCounts] = useState({
    rooms: 2,
    adults: 2,
    children: 4
  })
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const updateCount = (type, change) => {
    setCounts((prevCounts) => {
      const newCount = prevCounts[type] + change
      return {
        ...prevCounts,
        [type]: Math.max(0, newCount)
      }
    })
  }

  const listLocation = locations?.data
  const totalGuests = counts.adults + counts.children
  const summary = `${counts.rooms} Rooms - ${totalGuests} Guests`
  return (
    <div className="search_nav">
      <table className="table_search" border="1">
        <tr>
          <td>
            <CiLocationOn className="item_icon-search" />
            Địa điểm
          </td>
          <td>
            <BsCalendar2Date className="item_icon-search" />
            Thời gian
          </td>
          <td>
            <FaRestroom className="item_icon-search" />
            Số phòng - Người
          </td>
          <td></td>
        </tr>
        <tr>
          <td className="option_tour">
            <select
              className="city-select"
              onChange={handleLocationChange}
              value={selectedLocation}
            >
              <option value="">Chọn địa điểm</option>
              {listLocation?.map((location) => (
                <option key={location._id} value={location._id}>
                  {location?.provinceCity}
                </option>
              ))}
            </select>
          </td>
          <td>
            <div className="date-container">
              <input type="date" id="start-date" className="date-input" />
              <input type="date" id="end-date" className="date-input" />
            </div>
          </td>
          <td>
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                {summary}
              </button>
              {isOpen && (
                <div className="dropdown-content">
                  <div className="item">
                    <span>Rooms</span>
                    <div className="counter">
                      <button onClick={() => updateCount('rooms', -1)}>
                        −
                      </button>
                      <span>{counts.rooms}</span>
                      <button onClick={() => updateCount('rooms', 1)}>+</button>
                    </div>
                  </div>
                  <div className="item">
                    <span>Adults</span>
                    <div className="counter">
                      <button onClick={() => updateCount('adults', -1)}>
                        −
                      </button>
                      <span>{counts.adults}</span>
                      <button onClick={() => updateCount('adults', 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item">
                    <span>Children</span>
                    <div className="counter">
                      <button onClick={() => updateCount('children', -1)}>
                        −
                      </button>
                      <span>{counts.children}</span>
                      <button onClick={() => updateCount('children', 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </td>
          <td>
            <Button onClick={handleSearch}>Tìm kiếm</Button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default SearchHotel

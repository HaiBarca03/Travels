import React, { useEffect, useState } from 'react'
import './SearchRestaurant.css'
import { CiLocationOn } from 'react-icons/ci'
import { IoRestaurant } from 'react-icons/io5'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLocal } from '../../../service/localService'
import {
  getAllRestaurant,
  getResByLocal
} from '../../../service/restaurantService'
import { useNavigate } from 'react-router-dom'

const SearchRestaurant = () => {
  const { locations, isLoading, error } = useSelector((state) => state.local)
  const { allRestaurant } = useSelector((state) => state.restaurant)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllLocal())
    dispatch(getAllRestaurant())
  }, [dispatch])
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value)
  }
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

  const handleSearch = () => {
    if (selectedLocation) {
      dispatch(
        getResByLocal({ locationId: selectedLocation, type: selectedType })
      ).then((response) => {
        const searchRes = response?.payload || []
        navigate('/search/restaurant', { state: { searchRes } })
      })
    }
  }
  const listLocation = locations?.data
  const restaurantData = allRestaurant?.data
  return (
    <div className="search_nav">
      <table className="table_search" border="1">
        <tr>
          <td>
            <CiLocationOn className="item_icon-search" />
            Địa điểm
          </td>
          <td>
            <IoRestaurant className="item_icon-search" />
            Loại nhà hàng
          </td>
          <td></td>
        </tr>
        <tr>
          <td className="option_restaurant">
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
          <td className="option_restaurant">
            <select
              className="city-select"
              onChange={handleTypeChange}
              value={selectedType}
            >
              <option value="">Loại nhà hàng</option>
              {restaurantData?.map((data) => (
                <option key={data._id} value={data?.type}>
                  {data?.type}
                </option>
              ))}
            </select>
          </td>
          <td className="btn_restaurant">
            <Button onClick={handleSearch}>Tìm kiếm</Button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default SearchRestaurant

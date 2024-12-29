import React, { useEffect, useState } from 'react'
import './SearchTour.css'
import { Button } from 'antd'
import { CiLocationOn } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLocal } from '../../../service/localService'
import { getLocalTourist } from '../../../service/touristService'
import { useNavigate } from 'react-router-dom'

const SearchTour = () => {
  const { locations, isLoading, error } = useSelector((state) => state.local)
  const { tours } = useSelector((state) => state.localTourist)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedLocation, setSelectedLocation] = useState('')

  useEffect(() => {
    dispatch(getAllLocal())
  }, [dispatch])

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value)
  }

  const handleSearch = () => {
    if (selectedLocation) {
      dispatch(getLocalTourist(selectedLocation)).then((response) => {
        const searchTour = response?.payload?.data || []
        navigate('search/tourist-destination', { state: { searchTour } })
      })
    }
  }

  useEffect(() => {
    if (tours) {
      console.log('Tours:', tours)
    }
  }, [tours])

  const listLocation = locations?.data

  return (
    <div className="search_nav">
      <table className="table_search" border="1">
        <tbody>
          <tr>
            <td>
              <CiLocationOn className="item_icon-search" />
              Địa điểm
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
            <td className="btn_tour">
              <Button onClick={handleSearch}>Tìm kiếm</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SearchTour

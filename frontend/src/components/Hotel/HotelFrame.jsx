import React from 'react'
import { Rate, Card } from 'antd'
import './HotelFrame.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getHotelDetail } from '../../service/hotelService'

const HotelFrame = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { hotelDetail } = useSelector((state) => state.hotel)
  const handleHotel = async (id) => {
    try {
      const response = await dispatch(getHotelDetail(id)).unwrap()
      navigate('/hotel-detail', { state: { hotelDetail: response } })
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error)
    }
  }

  return (
    <div className="hotel-container">
      {data?.map((hotelData) => (
        <Card
          key={hotelData._id}
          hoverable
          style={{ width: 300, marginBottom: '20px' }}
          cover={<img alt="hotel" src={hotelData?.images?.[0]?.url} />}
          onClick={() => handleHotel(hotelData._id)}
        >
          <h3 className="name-hotel-fr">{hotelData.name}</h3>
          <p className="address-hotel-fr">{hotelData.address}</p>
          <p>{hotelData.location?.provinceCity}</p>
          <p>
            <strong>Type:</strong> {hotelData.type}
          </p>
          <p>
            <strong>Price:</strong> {hotelData.price} VND
          </p>
          <div>
            <strong>Rating:</strong>
            <Rate disabled defaultValue={hotelData.rating} />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default HotelFrame

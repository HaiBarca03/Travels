import React from 'react'
import { Rate, Card, Empty } from 'antd'
import './TouristDestinationFrame.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTouristDetail } from '../../service/touristService'

const TouristDestinationFrame = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toursDetail } = useSelector((state) => state.localTourist)
  console.log('data', data)
  if (!data || data.length === 0) {
    return (
      <div className="empty-container">
        <Empty description="Không có địa điểm nào" />
      </div>
    )
  }
  const handleTouris = async (id) => {
    try {
      const response = await dispatch(getTouristDetail(id)).unwrap()
      navigate('/tourist-destination-detail', {
        state: { toursDetail: response }
      })
    } catch (error) {
      console.error('Failed to fetch tourist-destination-detail:', error)
    }
  }
  return (
    <div className="tourist-container">
      {data?.map((destination) => (
        <Card
          key={destination._id}
          hoverable
          style={{ width: 300, marginBottom: '20px' }}
          cover={<img alt="destination" src={destination.images[0]?.url} />}
          onClick={() => handleTouris(destination._id)}
          className="cart_tourist-frame"
        >
          <h3>{destination.name}</h3>
          {/* <p>
            {destination.location?.provinceCity},{' '}
            {destination.location?.country}
          </p> */}
          <p className="description">{destination.description}</p>
          <p>
            <strong>Price:</strong> {destination.price} VND
          </p>
          <div>
            <strong>Rating:</strong>
            <Rate disabled defaultValue={destination.rating} />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default TouristDestinationFrame

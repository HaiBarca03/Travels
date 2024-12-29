import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteFavorite } from '../../../service/userService'
import { Table, Tag, Rate } from 'antd'
import '../Css/CssFrame.css'
import { getLocalTourist } from '../../../service/touristService'

const LocationFavorite = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLocal = async (id) => {
    try {
      dispatch(getLocalTourist(id)).then((response) => {
        const searchTour = response?.payload?.data || []
        navigate('/search/tourist-destination', { state: { searchTour } })
      })
    } catch (error) {
      console.error('Failed to fetch hotel details:', error)
    }
  }

  const handleDeleteLocal = (locationId) => {
    dispatch(deleteFavorite({ locationId: locationId }))
  }

  const imgUrl = data?.map((item) => item.avatar)
  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div className="images-container">
          {imgUrl && imgUrl.length > 0 ? (
            imgUrl.map((item, index) => (
              <img
                key={index}
                src={item?.url}
                alt={`restaurant-image-${index}`}
                style={{
                  width: '60px',
                  height: '60px',
                  marginRight: '8px',
                  borderRadius: '50%'
                }}
              />
            ))
          ) : (
            <span>No images available</span>
          )}
        </div>
      )
    },
    {
      title: 'Khu vực',
      dataIndex: 'country',
      key: 'country'
    },
    {
      title: 'City',
      dataIndex: 'provinceCity',
      key: 'provinceCity'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span className="action-btns">
          <Tag color="blue" onClick={() => handleLocal(record._id)}>
            View
          </Tag>
          <Tag color="red" onClick={() => handleDeleteLocal(record._id)}>
            Delete
          </Tag>
        </span>
      )
    }
  ]

  return (
    <div className="restaurant-favorite-container">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={false}
        className="restaurant-table"
      />
    </div>
  )
}

export default LocationFavorite

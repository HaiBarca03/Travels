import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTouristDetail } from '../../../service/touristService'
import { deleteFavorite } from '../../../service/userService'
import { Table, Tag, Rate } from 'antd'
import '../Css/CssFrame.css'

const TouristFavorite = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleTourist = async (id) => {
    try {
      const response = await dispatch(getTouristDetail(id)).unwrap()
      navigate('/tourist-destination-detail', {
        state: { toursDetail: response }
      })
    } catch (error) {
      console.error('Failed to fetch hotel details:', error)
    }
  }

  const handleDeleteTourist = (touristId) => {
    dispatch(deleteFavorite({ touristId: touristId }))
  }

  const imgUrl = data?.map((item) => item.images[0])

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
                  width: '50px',
                  height: '50px',
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled value={rating} />
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span className="action-btns">
          <Tag color="blue" onClick={() => handleTourist(record._id)}>
            View
          </Tag>
          <Tag color="red" onClick={() => handleDeleteTourist(record._id)}>
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

export default TouristFavorite

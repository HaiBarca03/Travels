import React from 'react'
import { Table, Rate, Tag } from 'antd'
import '../Css/CssFrame.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getResById } from '../../../service/restaurantService'
import { deleteFavorite } from '../../../service/userService'

const RestaurantFavorite = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRes = async (id) => {
    try {
      const response = await dispatch(getResById(id)).unwrap()
      navigate('/restaurant-detail', { state: { restaurantDetail: response } })
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error)
    }
  }

  const handleDeleteRes = (restaurantId) => {
    dispatch(deleteFavorite({ restaurantId: restaurantId }))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
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
          <Tag color="blue" onClick={() => handleRes(record._id)}>
            View
          </Tag>
          <Tag color="red" onClick={() => handleDeleteRes(record._id)}>
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

export default RestaurantFavorite

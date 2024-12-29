import React from 'react'
import { Table, Rate, Tag } from 'antd'
import '../Css/CssFrame.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteFavorite } from '../../../service/userService'
import { getHotelDetail } from '../../../service/hotelService'

const HotelFavorite = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleHotel = async (id) => {
    try {
      const response = await dispatch(getHotelDetail(id)).unwrap()
      navigate('/hotel-detail', { state: { hotelDetail: response } })
    } catch (error) {
      console.error('Failed to fetch hotel details:', error)
    }
  }

  const handleDeleteHotel = (accommodationId) => {
    dispatch(deleteFavorite({ accommodationId: accommodationId }))
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
          <Tag color="blue" onClick={() => handleHotel(record._id)}>
            View
          </Tag>
          <Tag color="red" onClick={() => handleDeleteHotel(record._id)}>
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

export default HotelFavorite

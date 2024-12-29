import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteFavorite } from '../../../service/userService'
import { Table, Tag, Rate } from 'antd'
import { format } from 'date-fns'
import '../Css/CssFrame.css'

const TourFavorite = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleTour = async (id) => {
    try {
      navigate(`/tour-detail/${id}`)
    } catch (error) {
      console.error('Failed to fetch hotel details:', error)
    }
  }

  const handleDeleteTour = (touristId) => {
    dispatch(deleteFavorite({ touristId: touristId }))
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Khởi hành',
      dataIndex: 'place_departure',
      key: 'place_departure'
    },
    {
      title: 'Time',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (start_date) => format(new Date(start_date), 'dd/MM/yyyy')
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
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
          <Tag color="blue" onClick={() => handleTour(record._id)}>
            View
          </Tag>
          <Tag color="red" onClick={() => handleDeleteTour(record._id)}>
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

export default TourFavorite

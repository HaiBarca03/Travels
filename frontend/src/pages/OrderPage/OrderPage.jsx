import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Select, Space, Tag, Spin } from 'antd'
import {
  cancelBookingByUser,
  getBookingByUser
} from '../../service/bookingService'
import './OrderPage.css'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const OrderPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookingByUser, isLoading, error } = useSelector(
    (state) => state.booking
  )

  const [filteredData, setFilteredData] = useState([])
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    dispatch(getBookingByUser('pending'))
  }, [dispatch])

  useEffect(() => {
    if (bookingByUser?.groupedBookings) {
      setFilteredData(
        [
          ...(bookingByUser.groupedBookings.tours?.map((item) => ({
            ...item,
            type: 'Tour'
          })) || []),
          ...(bookingByUser.groupedBookings.hotels?.map((item) => ({
            ...item,
            type: 'Hotel'
          })) || [])
        ].filter((item) => typeFilter === 'all' || item.type === typeFilter)
      )
    }
  }, [bookingByUser, typeFilter])

  const handleCancel = (id) => {
    dispatch(cancelBookingByUser(id))
  }

  const handlePayment = (id) => {
    navigate('/payment', { state: { orderId: id } })
  }

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Name', dataIndex: ['tour_id', 'name'], key: 'name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Total Cost', dataIndex: 'total_cost', key: 'total_cost' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'pending' ? 'orange' : 'green'}>{status}</Tag>
      )
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method'
    },
    {
      title: 'Booking Date',
      dataIndex: 'booking_date',
      key: 'booking_date',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            danger
            onClick={() => handleCancel(record._id)}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={() => handlePayment(record._id)}>
            Pay
          </Button>
        </Space>
      )
    }
  ]

  if (isLoading) {
    return <Spin tip="Loading..." size="large" />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className="order-page">
      {filteredData.length > 0 ? (
        <>
          <h1>Booking Management</h1>
          <div className="filters">
            <Select
              defaultValue="all"
              onChange={(value) => setTypeFilter(value)}
              style={{ width: 200, marginRight: 10 }}
            >
              <Option value="all">All Types</Option>
              <Option value="Tour">Tour</Option>
              <Option value="Hotel">Hotel</Option>
            </Select>
          </div>
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  )
}

export default OrderPage

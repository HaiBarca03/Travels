import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Select, Space, Tag, Spin, Modal } from 'antd'
import {
  cancelBookingByUser,
  getBookingByUser
} from '../../service/bookingService'
import './BookedPage.css'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { confirm } = Modal

const BookedPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookingByUser, isLoading, error } = useSelector(
    (state) => state.booking
  )

  const [filteredData, setFilteredData] = useState([])
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('paid')

  useEffect(() => {
    const statusParam = statusFilter === 'all' ? null : statusFilter
    dispatch(getBookingByUser(statusParam))
  }, [dispatch, statusFilter])

  useEffect(() => {
    if (bookingByUser?.groupedBookings) {
      const combinedData = [
        ...(bookingByUser.groupedBookings.tours?.map((item) => ({
          ...item,
          type: 'Tour'
        })) || []),
        ...(bookingByUser.groupedBookings.hotels?.map((item) => ({
          ...item,
          type: 'Hotel'
        })) || [])
      ]

      const filtered = combinedData.filter(
        (item) =>
          (typeFilter === 'all' || item.type === typeFilter) &&
          (statusFilter === 'all' || item.status === statusFilter)
      )
      setFilteredData(filtered)
    }
  }, [bookingByUser, typeFilter, statusFilter])

  const showCancelConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to cancel this booking?',
      content:
        'Cancelling will result in a 50% deduction from the paid amount.',
      okText: 'Yes, Cancel',
      okType: 'danger',
      cancelText: 'No',
      className: 'custom-modal-cancel-pay',
      onOk: async () => {
        await dispatch(cancelBookingByUser(id))
        dispatch(getBookingByUser(statusFilter === 'all' ? null : statusFilter))
      },
      onCancel() {
        console.log('Cancellation aborted')
      }
    })
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
      render: (status) => {
        const statusColors = {
          pending: 'orange',
          paid: 'green',
          cancel: 'red'
        }
        return <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
      }
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
          {record.status !== 'cancel' ? (
            <Button
              type="primary"
              danger
              onClick={() => showCancelConfirm(record._id)}
            >
              Cancel
            </Button>
          ) : (
            <Button type="default" onClick={() => handlePayment(record._id)}>
              Buy Again
            </Button>
          )}
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
    <>
      {bookingByUser.length !== 0 ? (
        <div className="order-page">
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
            <Select
              defaultValue="paid"
              onChange={(value) => setStatusFilter(value)}
              style={{ width: 200 }}
            >
              <Option value="all">All Statuses</Option>
              <Option value="paid">Completed</Option>
              <Option value="cancel">Cancelled</Option>
            </Select>
          </div>
          {filteredData.length > 0 ? (
            <Table
              dataSource={filteredData}
              columns={columns}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
            />
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      ) : (
        <p>No bookings found.</p> // Hiển thị nếu mảng rỗng
      )}
    </>
  )
}

export default BookedPage

import React, { useEffect } from 'react'
import { Table, Button, Card, Rate, Carousel } from 'antd'
import './PaymentPage.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingById } from '../../service/bookingService'
import {
  callbackPayment,
  createPayment,
  createPaymentMomo
} from '../../service/paymentService'

const PaymentPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { getBookById } = useSelector((state) => state.booking)
  const { dataCreatePayment, dataCallbackPayment, dataCreatePaymentMomo } =
    useSelector((state) => state.payment)
  const { orderId } = location.state
  useEffect(() => {
    dispatch(getBookingById(orderId))
  }, [dispatch, orderId])
  const bookingData = getBookById?.booking
  const groupColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    {
      title: 'Birth',
      dataIndex: 'birth',
      key: 'birth',
      render: (text) => new Date(text).toLocaleDateString()
    }
  ]

  const handlePayment = async (orderData) => {
    const orderBody = {
      booking_id: orderData._id,
      items: [
        {
          code: orderData._id,
          quantity: orderData.quantity,
          price: orderData.total_cost
        }
      ],
      description: `Payment for ${
        orderData?.tour_id.name ||
        orderData?.restaurant_id.name ||
        orderData?.hotel_id.name ||
        orderData?.tourist_id.name
      }`,
      amount: orderData?.total_cost
    }
    if (orderData?.payment_method === 'zalo_pay') {
      await dispatch(createPayment(orderBody))

      if (dataCreatePayment?.data?.order_url) {
        window.location.href = dataCreatePayment.data.order_url

        setTimeout(() => {
          window.location.href = 'http://localhost:5173/order'
        }, 20000)
      } else {
        console.error('Failed to retrieve payment URL:')
      }
    }
    if (orderData?.payment_method === 'momo') {
      await dispatch(createPaymentMomo(orderBody))

      if (dataCreatePaymentMomo?.data?.payUrl) {
        window.location.href = dataCreatePaymentMomo.data.payUrl

        setTimeout(() => {
          window.location.href = 'http://localhost:5173/order'
        }, 20000)
      } else {
        console.error('Failed to retrieve payment URL:')
      }
    }
  }

  return (
    <div className="payment-container">
      <div className="payment-content">
        <div className="left-section">
          <div className="user-info-payment">
            <h2>User Information</h2>
            <p>
              <strong>Name:</strong> {bookingData?.user_id?.name}
            </p>
            <p>
              <strong>Address:</strong> {bookingData?.user_id?.addresses}
            </p>
            <p>
              <strong>Phone:</strong> {bookingData?.user_id?.phone}
            </p>
            <p>
              <strong>Email:</strong> {bookingData?.user_id?.email}
            </p>
          </div>

          <div className="tour-info-payment">
            <h2>Tour Information</h2>
            <p>
              <strong>
                Code:{' '}
                {bookingData?.tour_id._id ||
                  bookingData?.restaurant_id?._id ||
                  bookingData?.hotel_id?._id ||
                  bookingData?.tourist_id?._id}
              </strong>
            </p>
            <p>
              <strong>Name:</strong>
              {bookingData?.tour_id?.name ||
                bookingData?.restaurant_id?.name ||
                bookingData?.hotel_id?.name ||
                bookingData?.tourist_id?.name}
            </p>
            <p>
              <strong>
                Giá:{' '}
                {bookingData?.tour_id.price ||
                  bookingData?.restaurant_id?.name ||
                  bookingData?.hotel_id?.name ||
                  bookingData?.tourist_id?.name}{' '}
                VNĐ
              </strong>
            </p>
            <p>
              <strong>Booking Date:</strong>
              {new Date(bookingData?.booking_date).toLocaleDateString()}
            </p>
          </div>

          {bookingData?.groupAdultInformation?.length > 0 && (
            <div className="group-info">
              <h2>Group Adult Information</h2>
              <Table
                columns={groupColumns}
                dataSource={bookingData?.groupAdultInformation.map((adult) => ({
                  ...adult,
                  key: adult._id
                }))}
                pagination={false}
              />
            </div>
          )}

          {bookingData?.groupChildrenInformation?.length > 0 && (
            <div className="group-info">
              <h2>Group Children Information</h2>
              <Table
                columns={groupColumns}
                dataSource={bookingData?.groupChildrenInformation.map(
                  (child) => ({
                    ...child,
                    key: child._id
                  })
                )}
                pagination={false}
              />
            </div>
          )}
        </div>

        <div className="right-section">
          <div className="payment-info">
            <h2>Payment Information</h2>
            <p>
              <strong>Total Cost:</strong> {bookingData?.total_cost} VND
            </p>
            <p>
              <strong>Payment Method:</strong> {bookingData?.payment_method}
            </p>
            <p>
              <strong>Quantity:</strong> {bookingData?.quantity}
            </p>
            <Button
              type="primary"
              block
              onClick={() => handlePayment(bookingData)}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

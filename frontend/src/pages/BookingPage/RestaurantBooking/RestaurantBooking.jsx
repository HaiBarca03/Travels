import React, { useEffect, useState } from 'react'
import { Input, Select, DatePicker, Button, Form } from 'antd'
import './RestaurantBooking.css'
import InfoBooking from '../../../components/Booking/InfoBooing/InfoBooing'
import { useDispatch, useSelector } from 'react-redux'
import { createBooking, getBookingById } from '../../../service/bookingService'
import { useLocation, useNavigate } from 'react-router-dom'
import { getHotelDetail } from '../../../service/hotelService'
import { getResById } from '../../../service/restaurantService'

const { Option } = Select

const RestaurantBooking = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [form] = Form.useForm()

  const { restaurantDetail } = useSelector((state) => state.restaurant)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [passengerData, setPassengerData] = useState([])
  const [infantData, setInfantData] = useState([])
  const [passengerCount, setPassengerCount] = useState(1)
  const [infantCount, setInfantCount] = useState(0)

  const restaurantId = state?.restaurantId
  useEffect(() => {
    dispatch(getResById(restaurantId))
  }, [dispatch, restaurantId])

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method)
  }

  const handlePassengerDataChange = (data) => {
    setPassengerData(data)
  }

  const handleInfantDataChange = (data) => {
    setInfantData(data)
  }

  const handlePassengerCountChange = (count) => {
    setPassengerCount(count)
  }

  const handleInfantCountChange = (count) => {
    setInfantCount(count)
  }
  const totalRestaurantPrice = passengerCount * restaurantDetail.price
  const reqRestaurantBooking = {
    restaurant_id: restaurantDetail._id,
    quantity: passengerCount,
    total_cost: totalRestaurantPrice,
    payment_method: selectedPaymentMethod,
    groupAdultInformation: passengerData,
    groupChildrenInformation: infantData
  }

  const payBooking = async () => {
    try {
      const response = await dispatch(
        createBooking(reqRestaurantBooking)
      ).unwrap()
      const oId = response.booking._id

      await dispatch(getBookingById(oId)).unwrap()

      navigate('/payment', { state: { orderId: oId } })
    } catch (error) {
      console.error('Error in payBooking:', error)
    }
  }

  return (
    <div className="tour-booking">
      <InfoBooking
        form={form}
        onPaymentMethodChange={handlePaymentMethodChange}
        onPassengerDataChange={handlePassengerDataChange}
        onInfantDataChange={handleInfantDataChange}
        onPassengerCountChange={handlePassengerCountChange}
        onInfantCountChange={handleInfantCountChange}
      />

      <div className="tour-booking__right">
        <h2>Tour Information</h2>

        <p>
          <b>Name:</b> {restaurantDetail.name}
        </p>
        <p>
          <b>Address:</b> {restaurantDetail.address}
        </p>
        <p>
          <b>Type:</b> {restaurantDetail.type}
        </p>
        <p>
          <b>Price per Person:</b> ${restaurantDetail.price}
        </p>
        <h3>Total Price: ${totalRestaurantPrice}</h3>

        <Button type="primary" onClick={payBooking} block>
          Đặt ngay
        </Button>
      </div>
    </div>
  )
}

export default RestaurantBooking

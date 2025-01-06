import React, { useEffect, useState } from 'react'
import { Input, Select, DatePicker, Button, Form } from 'antd'
import './HotelBooking.css'
import InfoBooking from '../../../components/Booking/InfoBooing/InfoBooing'
import { useDispatch, useSelector } from 'react-redux'
import { createBooking, getBookingById } from '../../../service/bookingService'
import { useLocation, useNavigate } from 'react-router-dom'
import { getHotelDetail } from '../../../service/hotelService'

const { Option } = Select

const HotelBooking = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [form] = Form.useForm()

  const { hotelDetail } = useSelector((state) => state.hotel)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [passengerData, setPassengerData] = useState([])
  const [infantData, setInfantData] = useState([])
  const [passengerCount, setPassengerCount] = useState(1)
  const [infantCount, setInfantCount] = useState(0)

  const hotelId = state?.hotelId
  useEffect(() => {
    dispatch(getHotelDetail(hotelId))
  }, [dispatch, hotelId])

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
  const totalHotelPrice = passengerCount * hotelDetail.price
  const reqHotelBooking = {
    hotel_id: hotelDetail._id,
    quantity: passengerCount,
    total_cost: totalHotelPrice,
    payment_method: selectedPaymentMethod,
    groupAdultInformation: passengerData,
    groupChildrenInformation: infantData
  }

  const payBooking = async () => {
    try {
      const response = await dispatch(createBooking(reqHotelBooking)).unwrap()
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
          <b>Name:</b> {hotelDetail.name}
        </p>
        <p>
          <b>Address:</b> {hotelDetail.address}
        </p>
        <p>
          <b>Type:</b> {hotelDetail.type}
        </p>
        <p>
          <b>Price per Person:</b> ${hotelDetail.price}
        </p>
        <h3>Total Price: ${totalHotelPrice}</h3>

        <Button type="primary" onClick={payBooking} block>
          Đặt ngay
        </Button>
      </div>
    </div>
  )
}

export default HotelBooking

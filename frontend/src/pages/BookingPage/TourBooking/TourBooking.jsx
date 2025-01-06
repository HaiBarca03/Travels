import React, { useEffect, useState } from 'react'
import { Input, Select, DatePicker, Button, Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import './TourBooking.css'
import InfoBooking from '../../../components/Booking/InfoBooing/InfoBooing'
import { useDispatch, useSelector } from 'react-redux'
import { createBooking, getBookingById } from '../../../service/bookingService'
import PaymentPage from '../../PaymentPage/PaymentPage'

const { Option } = Select

const TourBooking = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [passengerData, setPassengerData] = useState([])
  const [infantData, setInfantData] = useState([])
  const [passengerCount, setPassengerCount] = useState(1)
  const [infantCount, setInfantCount] = useState(0)
  const [orderId, setOrderId] = useState('')

  const { detailTour } = useSelector((state) => state.tour)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const tourDetail = detailTour?.tour
  const tourData = {
    id: tourDetail?._id,
    name: tourDetail?.name,
    code: tourDetail?.code,
    tour_places: tourDetail?.tour_places.map((place) => place.name),
    price: tourDetail?.price,
    start_date: tourDetail?.start_date,
    place_departure: tourDetail?.place_departure,
    time: tourDetail?.time
  }
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
  const totalPrice = passengerCount * tourData.price
  const reqBooking = {
    user_id: tourData.id,
    tour_id: tourData.id,
    quantity: passengerCount,
    total_cost: totalPrice,
    payment_method: selectedPaymentMethod,
    groupAdultInformation: passengerData,
    groupChildrenInformation: infantData
  }

  const payBooking = async () => {
    try {
      const response = await dispatch(createBooking(reqBooking)).unwrap()
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
          <b>Name:</b> {tourData.name}
        </p>
        <p>
          <b>Code:</b> {tourData.code}
        </p>
        <p>
          <b>Tour Places:</b> {tourData.tour_places.join(', ')}
        </p>
        <p>
          <b>Start Date:</b> {tourData.start_date}
        </p>
        <p>
          <b>Departure:</b> {tourData.place_departure}
        </p>
        <p>
          <b>Duration:</b> {tourData.time}
        </p>
        <p>
          <b>Price per Person:</b> ${tourData.price}
        </p>
        <h3>Total Price: ${totalPrice}</h3>
        <Button type="primary" onClick={payBooking} block>
          Đặt ngay
        </Button>
      </div>
    </div>
  )
}

export default TourBooking

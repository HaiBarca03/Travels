import React, { useEffect, useState } from 'react'
import { Input, Select, DatePicker, Button, Form } from 'antd'
import './TouristBooking.css'
import InfoBooking from '../../../components/Booking/InfoBooing/InfoBooing'
import { useDispatch, useSelector } from 'react-redux'
import { createBooking, getBookingById } from '../../../service/bookingService'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTouristDetail } from '../../../service/touristService'

const { Option } = Select

const TouristBooking = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation()
  const [form] = Form.useForm()

  const { toursDetail } = useSelector((state) => state.localTourist)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [passengerData, setPassengerData] = useState([])
  const [infantData, setInfantData] = useState([])
  const [passengerCount, setPassengerCount] = useState(1)
  const [infantCount, setInfantCount] = useState(0)

  const touristId = state?.touristId
  useEffect(() => {
    dispatch(getTouristDetail(touristId))
  }, [dispatch, touristId])

  const touristDetail = toursDetail?.data
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
  const totalTouristPrice = passengerCount * touristDetail.price
  const reqTouristBooking = {
    tourist_id: touristDetail._id,
    quantity: passengerCount,
    total_cost: totalTouristPrice,
    payment_method: selectedPaymentMethod,
    groupAdultInformation: passengerData,
    groupChildrenInformation: infantData
  }

  const payBooking = async () => {
    try {
      const response = await dispatch(createBooking(reqTouristBooking)).unwrap()
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
          <b>Name:</b> {touristDetail.name}
        </p>
        <p>
          <b>Price per Person:</b> ${touristDetail.price}
        </p>
        <h3>Total Price: ${totalTouristPrice}</h3>

        <Button type="primary" onClick={payBooking} block>
          Đặt ngay
        </Button>
      </div>
    </div>
  )
}

export default TouristBooking

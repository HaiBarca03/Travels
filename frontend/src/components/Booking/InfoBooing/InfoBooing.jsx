import React, { useState, useEffect } from 'react'
import { Input, Select, DatePicker, Table, Button, Form, Checkbox } from 'antd'
import { useSelector } from 'react-redux'
import PaymentMethod from '../PaymentMethod/PaymentMethod'

const { TextArea } = Input
const { Option } = Select

const InfoBooking = ({
  form,
  onPassengerDataChange,
  onInfantDataChange,
  onPassengerCountChange,
  onInfantCountChange,
  onPaymentMethodChange
}) => {
  const { user } = useSelector((state) => state.user)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [passengerData, setPassengerData] = useState([])
  const [infantData, setInfantData] = useState([])
  const [passengerCount, setPassengerCount] = useState(1)
  const [infantCount, setInfantCount] = useState(0)

  useEffect(() => {
    onPassengerDataChange(passengerData)
  }, [passengerData])

  useEffect(() => {
    onInfantDataChange(infantData)
  }, [infantData])

  useEffect(() => {
    onPassengerCountChange(passengerCount)
  }, [passengerCount])

  useEffect(() => {
    onInfantCountChange(infantCount)
  }, [infantCount])

  useEffect(() => {
    onPaymentMethodChange(selectedPaymentMethod)
  }, [selectedPaymentMethod])

  const passengerColumnsData = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, __, index) => (
        <Input
          placeholder={`Passenger ${index + 1} Name`}
          name={`passengerName${index}`}
          onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
        />
      )
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, __, index) => (
        <Select
          placeholder="Select Gender"
          name={`passengerGender${index}`}
          onChange={(value) => handlePassengerChange(index, 'gender', value)}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      )
    },
    {
      title: 'Date of Birth',
      dataIndex: 'birth',
      key: 'birth',
      render: (_, __, index) => (
        <DatePicker
          style={{ width: '100%' }}
          name={`passengerDob${index}`}
          onChange={(date, dateString) =>
            handlePassengerChange(index, 'birth', dateString)
          }
        />
      )
    }
  ]

  const infantColumnsData = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, __, index) => (
        <Input
          placeholder={`Infant ${index + 1} Name`}
          name={`infantName${index}`}
          onChange={(e) => handleInfantChange(index, 'name', e.target.value)}
        />
      )
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (_, __, index) => (
        <Select
          placeholder="Select Gender"
          name={`infantGender${index}`}
          onChange={(value) => handleInfantChange(index, 'gender', value)}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      )
    },
    {
      title: 'Date of Birth',
      dataIndex: 'birth',
      key: 'birth',
      render: (_, __, index) => (
        <DatePicker
          style={{ width: '100%' }}
          name={`infantDob${index}`}
          onChange={(date, dateString) =>
            handleInfantChange(index, 'birth', dateString)
          }
        />
      )
    }
  ]

  const handlePassengerChange = (index, field, value) => {
    const newPassengerData = [...passengerData]
    newPassengerData[index] = { ...newPassengerData[index], [field]: value }
    setPassengerData(newPassengerData)
  }

  const handleInfantChange = (index, field, value) => {
    const newInfantData = [...infantData]
    newInfantData[index] = { ...newInfantData[index], [field]: value }
    setInfantData(newInfantData)
  }

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method)
  }

  return (
    <div className="tour-booking__left">
      <Form layout="vertical" form={form}>
        <h2>Thông tin đặt tour</h2>
        <div className="user-info">
          <div className="user-info__left">
            <Form.Item
              label="Name"
              name="name"
              initialValue={user?.name || ''}
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              initialValue={user?.email || ''}
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please enter a valid email'
                }
              ]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
          </div>
          <div className="user-info__right">
            <Form.Item
              label="Phone"
              name="phone"
              initialValue={user?.phone || ''}
              rules={[
                { required: true, message: 'Please enter your phone number' }
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="addresses"
              initialValue={user?.addresses || ''}
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input placeholder="Enter your address" />
            </Form.Item>
          </div>
        </div>
        <h2>Số lượng hành khách</h2>
        <div className="frame-info">
          <Form.Item label="Người lớn" name="passengerCount">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Button
                className="btn-count-quntity"
                onClick={() =>
                  setPassengerCount(Math.max(1, passengerCount - 1))
                }
                disabled={passengerCount === 1}
              >
                -
              </Button>
              <span>{passengerCount}</span>
              <Button
                className="btn-count-quntity"
                onClick={() => setPassengerCount(passengerCount + 1)}
                disabled={passengerCount === 10}
              >
                +
              </Button>
            </div>
          </Form.Item>

          <Form.Item label="Trẻ nhỏ ( dưới 2 tuổi )" name="infantCount">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Button
                className="btn-count-quntity"
                onClick={() => setInfantCount(Math.max(0, infantCount - 1))}
                disabled={infantCount === 0}
              >
                -
              </Button>
              <span>{infantCount}</span>
              <Button
                className="btn-count-quntity"
                onClick={() => setInfantCount(infantCount + 1)}
                disabled={infantCount === 5}
              >
                +
              </Button>
            </div>
          </Form.Item>
        </div>

        <h2>Thông tin hành khách</h2>
        <Table
          columns={passengerColumnsData}
          dataSource={Array.from({ length: passengerCount }, (_, i) => ({
            key: i
          }))}
          pagination={false}
        />
        {infantCount > 0 && (
          <Table
            columns={infantColumnsData}
            dataSource={Array.from({ length: infantCount }, (_, i) => ({
              key: i
            }))}
            pagination={false}
          />
        )}

        <Form.Item label="Notes">
          <TextArea rows={4} placeholder="Enter any additional notes" />
        </Form.Item>
        <PaymentMethod onMethodChange={handlePaymentMethodChange} />
        <Checkbox>I agree to the terms and conditions.</Checkbox>
      </Form>
    </div>
  )
}

export default InfoBooking

import React, { useEffect } from 'react'
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getHotelDetail } from '../../../../service/hotelService'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select

const EditHotel = ({ visible, onCancel, onSubmit, id }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { hotelDetail } = useSelector((state) => state.hotelDetail)
  console.log('hotelDetail', hotelDetail)
  console.log('id', id)

  useEffect(() => {
    dispatch(getHotelDetail(id))
  }, [dispatch, id])

  return (
    <Modal title="Edit Hotel" open={visible} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          name: hotelDetail?.name,
          address: hotelDetail?.address,
          price: hotelDetail?.price,
          rating: hotelDetail?.rating,
          type: hotelDetail?.type,
          amenities: hotelDetail?.amenities || [],
          images: hotelDetail?.images || []
        }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please enter the hotel name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter the address' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price (VND)"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating (Stars)"
          rules={[{ required: true, message: 'Please select the rating' }]}
        >
          <InputNumber min={1} max={5} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select the type' }]}
        >
          <Select>
            <Option value="Khách sạn">Khách sạn</Option>
            <Option value="Resort">Resort</Option>
            <Option value="Homestay">Homestay</Option>
          </Select>
        </Form.Item>
        <Form.Item name="amenities" label="Amenities">
          <Select mode="tags" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="images" label="Images">
          <Upload listType="picture-card" beforeUpload={() => false}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Hotel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditHotel

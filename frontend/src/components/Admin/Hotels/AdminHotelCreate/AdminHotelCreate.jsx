import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Select, Upload, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getAllLocation } from '../../../../service/adminService'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select

const AddHotel = ({ visible, onClose, onSubmit }) => {
  const { locations, loading } = useSelector((state) => state.adminGetLocal)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleFinish = (values) => {
    onSubmit(values)
    form.resetFields()
  }

  useEffect(() => {
    dispatch(getAllLocation())
  }, [dispatch])
  const listLocation = locations?.data
  return (
    <Modal
      title="Add New Hotel"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Hotel Name"
          rules={[{ required: true, message: 'Please enter the hotel name' }]}
        >
          <Input placeholder="Enter hotel name" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter the address' }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price (VND)"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Enter price"
            min={0}
          />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Rating (Stars)"
          rules={[{ required: true, message: 'Please select the rating' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={1}
            max={5}
            placeholder="Enter rating"
          />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select the type' }]}
        >
          <Select placeholder="Select hotel type">
            <Option value="Khách sạn">Khách sạn</Option>
            <Option value="Resort">Resort</Option>
            <Option value="Homestay">Homestay</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Mo ta"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input placeholder="Enter description" />
        </Form.Item>

        <Form.Item name="amenities" label="Amenities">
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Enter amenities"
          />
        </Form.Item>

        <Form.Item
          label="Chọn địa điểm"
          name="location"
          rules={[{ required: true, message: 'Vui lòng chọn địa điểm!' }]}
        >
          <Select placeholder="Chọn địa điểm">
            {listLocation?.map((location) => (
              <Select.Option key={location._id} value={location._id}>
                {location.country} - {location.provinceCity}
              </Select.Option>
            ))}
          </Select>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddHotel

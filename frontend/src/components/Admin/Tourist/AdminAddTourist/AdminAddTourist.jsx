import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Upload, Button, Select, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { addTourist, getAllLocation } from '../../../../service/adminService'
import { useDispatch, useSelector } from 'react-redux'

const AdminAddTourist = () => {
  const dispatch = useDispatch()
  const { locations, loading } = useSelector((state) => state.adminGetLocal)
  const [isAddModalVisible, setIsAddModalVisible] = useState(true)
  const [addForm] = Form.useForm()

  useEffect(() => {
    dispatch(getAllLocation())
  }, [dispatch])

  const listLocation = locations?.data || []
  console.log('listLocation', listLocation)

  const handleAdd = async () => {
    try {
      const values = await addForm.validateFields()

      const newTourist = new FormData()
      newTourist.append('name', values.name)
      newTourist.append('description', values.description)
      newTourist.append('price', values.price)
      newTourist.append('activities', values.activities)
      newTourist.append('location', values.location)

      const imageFiles = values.images?.fileList || []
      imageFiles.forEach((file) => {
        newTourist.append('images', file.originFileObj)
      })

      await dispatch(addTourist({ data: newTourist }))

      message.success('Địa điểm mới đã được thêm thành công!')
      setIsAddModalVisible(false)
      addForm.resetFields()
    } catch (error) {
      message.error('Vui lòng kiểm tra thông tin và thử lại.')
    }
  }

  const handleAddCancel = () => {
    setIsAddModalVisible(false)
    addForm.resetFields()
  }

  return (
    <div>
      <Modal
        title="Thêm Địa Điểm Mới"
        open={isAddModalVisible}
        onOk={handleAdd}
        onCancel={handleAddCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="name"
            label="Tên điểm đến"
            rules={[{ required: true, message: 'Vui lòng nhập tên điểm đến' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập Mô tả' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="activities"
            label="Hoạt động"
            rules={[{ required: true, message: 'Vui lòng nhập hoạt động' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Địa điểm"
            rules={[{ required: true, message: 'Vui lòng chọn địa điểm' }]}
          >
            <Select placeholder="Chọn địa điểm" loading={loading}>
              {listLocation.map((location) => (
                <Select.Option key={location._id} value={location.name}>
                  {location.provinceCity} - {}
                  {location.country}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="images" label="Hình Ảnh">
            <Upload listType="picture" beforeUpload={() => false} multiple>
              <Button icon={<UploadOutlined />}>Tải Ảnh Lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminAddTourist

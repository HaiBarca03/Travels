import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Upload, Button, Select, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import {
  getAllLocation,
  updateTouristAttraction
} from '../../../../service/adminService'
import { useDispatch, useSelector } from 'react-redux'
import { getTouristDetail } from '../../../../service/touristService'

const AdminEditTourist = ({ touristId }) => {
  console.log('touristId', touristId)
  const dispatch = useDispatch()
  const { locations, loading } = useSelector((state) => state.adminGetLocal)
  const { toursDetail } = useSelector((state) => state.localTourist)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [editForm] = Form.useForm()
  const [selectedTourist, setSelectedTourist] = useState(null)
  console.log('getTourDetail', toursDetail)
  useEffect(() => {
    dispatch(getAllLocation())
    const tourist = toursDetail?.data
    if (touristId) {
      dispatch(getTouristDetail(touristId)).then((tourist) => {
        setSelectedTourist(tourist)
        editForm.setFieldsValue({
          name: tourist.name,
          description: tourist.description,
          price: tourist.price,
          activities: tourist.activities,
          location: tourist.location,
          images: tourist.images
        })
        setIsEditModalVisible(true)
      })
    }
  }, [dispatch, touristId])

  const listLocation = locations?.data || []

  const handleEdit = async () => {
    try {
      const values = await editForm.validateFields()

      const updatedTourist = new FormData()
      updatedTourist.append('name', values.name)
      updatedTourist.append('description', values.description)
      updatedTourist.append('price', values.price)
      updatedTourist.append('activities', values.activities)
      updatedTourist.append('location', values.location)

      const imageFiles = values.images?.fileList || []
      imageFiles.forEach((file) => {
        updatedTourist.append('images', file.originFileObj)
      })

      await dispatch(
        updateTouristAttraction({
          touristAttractionId: touristId,
          data: updatedTourist
        })
      )

      message.success('Địa điểm đã được cập nhật thành công!')
      setIsEditModalVisible(false)
      editForm.resetFields()
    } catch (error) {
      message.error('Vui lòng kiểm tra thông tin và thử lại.')
    }
  }

  const handleEditCancel = () => {
    setIsEditModalVisible(false)
    editForm.resetFields()
  }

  return (
    <div>
      <Modal
        title="Chỉnh Sửa Địa Điểm"
        open={isEditModalVisible}
        onOk={handleEdit}
        onCancel={handleEditCancel}
        okText="Cập Nhật"
        cancelText="Hủy"
      >
        <Form form={editForm} layout="vertical">
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
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
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
                  {location.provinceCity} - {location.country}
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

export default AdminEditTourist

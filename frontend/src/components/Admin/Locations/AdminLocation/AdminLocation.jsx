import React, { useEffect, useState } from 'react'
import './AdminLocation.css'
import {
  List,
  Avatar,
  Typography,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message
} from 'antd'
import { MdDeleteForever } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  addLocation,
  adminDeleteLocation,
  getAllLocation,
  updateLocation
} from '../../../../service/adminService'
import { UploadOutlined } from '@ant-design/icons'

const { Title } = Typography

const AdminLocation = () => {
  const dispatch = useDispatch()
  const { locations, loading } = useSelector((state) => state.adminGetLocal)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [addForm] = Form.useForm()
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(getAllLocation())
  }, [dispatch])

  const listLocation = locations?.data || []

  const handleEdit = (location) => {
    setCurrentLocation(location)
    form.setFieldsValue({
      country: location.country,
      provinceCity: location.provinceCity
    })
    setIsModalVisible(true)
  }

  const handleAdd = async () => {
    try {
      const values = await addForm.validateFields()

      const newLocationData = new FormData()
      newLocationData.append('country', values.country)
      newLocationData.append('provinceCity', values.provinceCity)

      const avatarFile = addForm.getFieldValue('avatar')?.file
      if (avatarFile) {
        newLocationData.append('avatar', avatarFile)
      }
      dispatch(addLocation({ data: newLocationData }))
        .then(() => {
          dispatch(getAllLocation())
          message.success('Địa điểm mới đã được thêm thành công!')
        })
        .catch(() => {
          message.error('Đã xảy ra lỗi khi thêm địa điểm.')
        })

      setIsAddModalVisible(false)
      addForm.resetFields()
    } catch (error) {
      message.error('Vui lòng kiểm tra thông tin và thử lại.')
    }
  }

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields()

      const updatedData = new FormData()
      updatedData.append('country', values.country)
      updatedData.append('provinceCity', values.provinceCity)

      const avatarFile = form.getFieldValue('avatar')?.file
      if (avatarFile) {
        updatedData.append('avatar', avatarFile)
      }
      dispatch(
        updateLocation({ locationId: currentLocation._id, data: updatedData })
      )

      message.success('Cập nhật địa điểm thành công!')
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Đã xảy ra lỗi khi cập nhật địa điểm.')
    }
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa địa điểm này?',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      onOk: () => {
        dispatch(adminDeleteLocation({ locationId: id }))
          .then(() => {
            // Refresh the list of locations after delete
            dispatch(getAllLocation())
            message.success('Địa điểm đã được xóa thành công!')
          })
          .catch((error) => {
            message.error('Đã xảy ra lỗi khi xóa địa điểm.')
          })
      }
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleAddCancel = () => {
    setIsAddModalVisible(false)
    addForm.resetFields()
  }

  return (
    <div className="admin-location-container">
      <Card className="admin-location-card">
        <Title level={3} className="admin-location-title">
          Danh Sách Địa Điểm
        </Title>
        <div className="admin-location-add-button">
          <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
            Thêm Địa Điểm
          </Button>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={listLocation}
          renderItem={(item) => (
            <List.Item className="admin-location-item">
              <List.Item.Meta
                avatar={
                  item.avatar?.url ? (
                    <Avatar src={item.avatar.url} />
                  ) : (
                    <Avatar style={{ backgroundColor: '#87d068' }}>
                      {item.provinceCity[0]}
                    </Avatar>
                  )
                }
                title={<a href={`#${item._id}`}>{item.provinceCity}</a>}
                description={`Quốc gia: ${item.country}`}
              />
              <div className="admin-location-actions">
                <Button
                  type="link"
                  className="admin-location-edit-button"
                  onClick={() => handleEdit(item)}
                >
                  <FaEdit />
                  Sửa
                </Button>
                <Button
                  type="link"
                  danger
                  className="admin-location-delete-button"
                  onClick={() => handleDelete(item._id)}
                >
                  <MdDeleteForever />
                  Xóa
                </Button>
              </div>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="Cập Nhật Địa Điểm"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Cập Nhật"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="country"
            label="Quốc Gia"
            rules={[{ required: true, message: 'Vui lòng nhập quốc gia' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="provinceCity"
            label="Thành Phố / Tỉnh"
            rules={[
              { required: true, message: 'Vui lòng nhập thành phố / tỉnh' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="avatar" label="Hình Ảnh">
            <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Tải Ảnh Lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

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
            name="country"
            label="Quốc Gia"
            rules={[{ required: true, message: 'Vui lòng nhập quốc gia' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="provinceCity"
            label="Thành Phố / Tỉnh"
            rules={[
              { required: true, message: 'Vui lòng nhập thành phố / tỉnh' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="avatar" label="Hình Ảnh">
            <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Tải Ảnh Lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminLocation

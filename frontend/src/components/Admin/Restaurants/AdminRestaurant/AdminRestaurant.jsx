import React, { useState, useEffect } from 'react'
import {
  Table,
  Image,
  Button,
  Modal,
  Input,
  Upload,
  message,
  Form,
  Select
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllRestaurant,
  getResById
} from '../../../../service/restaurantService'
import { FaEdit, FaRegEye } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import {
  addRes,
  adminDeleteRes,
  getAllLocation,
  updateRes
} from '../../../../service/adminService'
import { UploadOutlined } from '@ant-design/icons'
import './AdminRestaurant.css'

const AdminRestaurant = () => {
  const dispatch = useDispatch()
  const { allRestaurant, restaurantDetail } = useSelector(
    (state) => state.restaurant
  )
  const { locations, loading } = useSelector((state) => state.adminGetLocal)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [deleteImages, setDeleteImages] = useState([])
  const [updateFormData, setUpdateFormData] = useState({})
  const [addForm] = Form.useForm()
  const listRestaurant = allRestaurant?.data
  const listLocation = locations?.data

  //console.log('locations', listLocation)

  useEffect(() => {
    dispatch(getAllRestaurant())
    dispatch(getAllLocation())
  }, [dispatch])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toLocaleString()} VND`
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {images.map((img) => (
            <Image key={img.public_id} src={img.url} width={50} />
          ))}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      className: 'action-res',
      render: (_, record) => (
        <div className="action-res-btn">
          <Button type="link" onClick={() => handleView(record._id)}>
            {' '}
            <FaRegEye /> Chi tiết
          </Button>
          <Button type="link" onClick={() => handleEdit(record)}>
            {' '}
            <FaEdit /> Chỉnh sửa
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            {' '}
            <MdDeleteForever />
            Xoá
          </Button>
        </div>
      )
    }
  ]

  const handleEdit = (restaurant) => {
    setUpdateFormData(restaurant)
    setDeleteImages([])
    setIsUpdateModalVisible(true)
  }

  const handleDelete = (id) => {
    console.log('id', id)
    dispatch(adminDeleteRes({ id: id }))
  }

  const handleView = (restaurantId) => {
    dispatch(getResById(restaurantId))
    setIsViewModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
    setIsViewModalVisible(false)
  }

  const handleUpdate = () => {
    const { _id, ...data } = updateFormData
    console.log('id', _id)
    dispatch(updateRes({ restaurantId: _id, data: { ...data, deleteImages } }))
      .unwrap()
      .then(() => {
        setIsUpdateModalVisible(false)
        dispatch(getAllRestaurant())
      })
      .catch((error) => {
        console.error('Update failed:', error)
      })
  }

  const handleImageDelete = (public_id) => {
    setDeleteImages((prev) => [...prev, public_id])
  }

  const handleAdd = async () => {
    try {
      const values = await addForm.validateFields()
      const newRestaurantData = new FormData()

      newRestaurantData.append('name', values.name)
      newRestaurantData.append('address', values.address)
      newRestaurantData.append('type', values.type)
      newRestaurantData.append('decription', values.decription)
      newRestaurantData.append('price', values.price)
      newRestaurantData.append('location', values.location)

      const avatarFile = addForm.getFieldValue('images')?.file
      console.log('avatarFile', avatarFile)
      if (avatarFile) {
        newRestaurantData.append('images', avatarFile)
      }
      console.log('newRestaurantData', newRestaurantData)
      dispatch(addRes({ data: newRestaurantData }))
        .unwrap()
        .then(() => {
          message.success('Nhà hàng mới đã được thêm thành công!')
          setIsModalVisible(false)
          addForm.resetFields()
        })
        .catch(() => {
          message.error('Đã xảy ra lỗi khi thêm nhà hàng.')
        })

      setIsModalVisible(false)
      addForm.resetFields()
    } catch (error) {
      message.error('Vui lòng kiểm tra thông tin và thử lại.')
    }
  }

  const handleAddCancel = async () => {
    setIsModalVisible(false)
  }

  return (
    <div className="admin-restaurant-frame">
      <h1>Admin - Restaurant Management</h1>
      <div className="create-res-btn">
        {' '}
        <Button
          className="create-res-btn-btn"
          onClick={() => setIsModalVisible(true)}
        >
          Thêm nhà hàng
        </Button>
      </div>
      <Table
        dataSource={listRestaurant}
        columns={columns}
        rowKey="_id"
        bordered
        className="table-res"
      />

      <Modal
        title="Chi tiết nhà hàng"
        open={isViewModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        className="view-res-modal"
      >
        {restaurantDetail && (
          <div className="modal-content">
            <div className="modal-content-left">
              <h2>{restaurantDetail.name}</h2>
              <p>
                <strong>Address:</strong> {restaurantDetail.address}
              </p>
              <p>
                <strong>Country:</strong>{' '}
                {restaurantDetail?.location?.provinceCity} -{' '}
                {restaurantDetail?.location?.country}
              </p>
              <p>
                <strong>Type:</strong> {restaurantDetail.type}
              </p>
              <p>
                <strong>decription:</strong> {restaurantDetail.decription}
              </p>
              <p>
                <strong>Price:</strong>{' '}
                {`${restaurantDetail?.price?.toLocaleString()} VND`}
              </p>
              <p>
                <strong>Rating:</strong> {restaurantDetail.rating}
              </p>
            </div>
            <div className="modal-content-right">
              {restaurantDetail?.images?.map((img, index) => (
                <Image src={img?.url} width={300} />
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Chỉnh sửa nhà hàng"
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        onOk={handleUpdate}
        className="update-res-modal"
      >
        <div>
          <label>Name:</label>
          <Input
            value={updateFormData.name || ''}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, name: e.target.value })
            }
          />
          <label>Address:</label>
          <Input
            value={updateFormData.address || ''}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, address: e.target.value })
            }
          />
          <label>Type:</label>
          <Input
            value={updateFormData.type || ''}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, type: e.target.value })
            }
          />
          <label>Description:</label>
          <Input
            value={updateFormData.decription || ''}
            onChange={(e) =>
              setUpdateFormData({
                ...updateFormData,
                decription: e.target.value
              })
            }
          />
          <label>Price:</label>
          <Input
            type="number"
            value={updateFormData.price || ''}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, price: e.target.value })
            }
          />

          <label>Images:</label>
          <Upload
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            onChange={({ file, fileList }) => {
              if (file.status === 'done') {
                message.success(`${file.name} file uploaded successfully`)
                setUpdateFormData({
                  ...updateFormData,
                  images: [...updateFormData.images]
                })
              } else if (file.status === 'error') {
                message.error(`${file.name} file upload failed.`)
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Tải Ảnh Lên</Button>
          </Upload>

          {updateFormData.images?.length > 0 && (
            <div className="images-section">
              <strong>Current Images:</strong>
              {updateFormData.images.map((img, index) => (
                <div key={index} className="image-item">
                  <Image src={img.url} width={100} />
                  <Button
                    onClick={() => handleImageDelete(img.public_id)}
                    type="link"
                    danger
                    className="delete-image-button"
                  >
                    <MdDeleteForever /> Xoá
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      <Modal
        title="Thêm Nhà Hàng Mới"
        open={isModalVisible}
        onOk={handleAdd}
        onCancel={handleAddCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Nhà Hàng"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhà hàng' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa Chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại Nhà Hàng"
            rules={[{ required: true, message: 'Vui lòng nhập loại nhà hàng' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="decription"
            label="Mo ta"
            rules={[{ required: true, message: 'Vui lòng nhập mo ta' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá nhà hàng' }]}
          >
            <Input type="number" />
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
          <Form.Item name="images" label="Hình Ảnh">
            <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Tải Ảnh Lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminRestaurant

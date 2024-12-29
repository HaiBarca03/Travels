import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Avatar, Button, Input, Form, message } from 'antd'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../service/userService'

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addresses: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses
      })
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses
      })
    }
  }, [user, form])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (values) => {
    try {
      const response = await dispatch(updateUser(values))
      if (response.meta.requestStatus === 'fulfilled') {
        message.success('Profile updated successfully')
      }
    } catch (error) {
      message.error(error.message || 'An error occurred')
    }
  }

  return (
    <div className="profile-container">
      <Row
        gutter={16}
        justify="center"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <Col span={24}>
          <Card
            title="Update Profile"
            bordered={false}
            className="profile-card"
          >
            <Row gutter={16}>
              <Col span={6} className="profile-left">
                <div className="avatar-container">
                  <Avatar size={128} src={user?.avatar?.url} />
                  <h3>{user?.name}</h3>
                  <p>{user?.role}</p>
                </div>
              </Col>

              <Col span={18}>
                <Card bordered={false} className="profile-info-card">
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={formData}
                    onFinish={handleSubmit}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: 'Please input your name!' }
                      ]}
                    >
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Please input your email!' }
                      ]}
                    >
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[
                        { required: true, message: 'Please input your phone!' }
                      ]}
                    >
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Address"
                      name="addresses"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your address!'
                        }
                      ]}
                    >
                      <Input
                        name="addresses"
                        value={formData.addresses}
                        onChange={handleInputChange}
                      />
                    </Form.Item>

                    <Button
                      type="primary"
                      htmlType="submit"
                      className="action-button"
                    >
                      Save Changes
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default UpdateProfile

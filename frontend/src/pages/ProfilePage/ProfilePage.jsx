import React, { useEffect, useState } from 'react'
import {
  Card,
  Col,
  Row,
  Avatar,
  Button,
  Divider,
  Modal,
  Input,
  message
} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import './ProfilePage.css'
import UpdateProfile from './UpdateProfile/UpdateProfile'
import {
  deleteUser,
  favoritesFromUser,
  HandleLogoutUser
} from '../../service/userService'
import { persistor } from '../../redux/store'
import FavoritesSection from '../../components/Favorites/FavoritesSection/FavoritesSection'
import { logoutUser } from '../../redux/reducer/user/userSlice'

const ProfilePage = () => {
  const { user, favoritesUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const showDeleteModal = () => {
    setIsModalVisible(true)
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await dispatch(
        deleteUser({ password, userId: user._id })
      )
      if (response.meta.requestStatus === 'fulfilled') {
        message.success('Account deleted successfully')
        setIsModalVisible(false)
        dispatch(logoutUser())
        dispatch(HandleLogoutUser())
        persistor.purge()
        navigate('/login')
      } else {
        setError('Incorrect password')
      }
    } catch (error) {
      message.error('Error deleting account')
    }
  }

  const handleCancelDelete = () => {
    setIsModalVisible(false)
    setError('')
  }

  useEffect(() => {
    dispatch(favoritesFromUser())
  }, [user])
  const listFavoritesRestaurant = favoritesUser?.favorite?.list_restaurant
  const listFavoritesHotel = favoritesUser?.favorite?.list_accommodations
  const listFavoritesTourist = favoritesUser?.favorite?.list_tourist
  const listFavoritesLocation = favoritesUser?.favorite?.list_location
  const listFavoritesTours = favoritesUser?.favorite?.list_tour
  return (
    <div className="profile-container">
      <Row
        gutter={16}
        justify="center"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <Col span={24}>
          <Card title="User Profile" bordered={false} className="profile-card">
            <Row gutter={16}>
              <Col span={6} className="profile-left">
                <div className="avatar-container">
                  <Avatar size={128} src={user?.avatar?.url} />
                  <h3>{user?.name}</h3>
                  <p>{user?.role}</p>
                </div>
                <div className="actions">
                  <Button
                    type="primary"
                    className="action-button"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    type="danger"
                    className="action-button"
                    onClick={showDeleteModal}
                  >
                    Delete Account
                  </Button>
                  <Button type="default" className="action-button">
                    Change Password
                  </Button>
                </div>
              </Col>

              <Col span={18}>
                <Card bordered={false} className="profile-info-card">
                  {isEditing ? (
                    <div>
                      <h2>Edit Profile</h2>
                      <UpdateProfile user={user} />
                      <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                  ) : (
                    <>
                      <p>
                        <strong>Email:</strong> {user?.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {user?.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {user?.addresses}
                      </p>
                      <p>
                        <strong>Role:</strong> {user?.role}
                      </p>
                      <Divider />
                      <p>
                        <strong>Favorite:</strong>
                        <FavoritesSection
                          listFavoritesTours={listFavoritesTours}
                          listFavoritesTourist={listFavoritesTourist}
                          listFavoritesRestaurant={listFavoritesRestaurant}
                          listFavoritesHotel={listFavoritesHotel}
                          listFavoritesLocation={listFavoritesLocation}
                        />
                      </p>
                      <p>
                        <strong>Booked:</strong>{' '}
                        {user?.booked?.length
                          ? user.booked.join(', ')
                          : 'No bookings'}
                      </p>
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Confirm Account Deletion"
        visible={isModalVisible}
        onOk={handleDeleteAccount}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
        destroyOnClose={true}
      >
        <p>Are you sure you want to delete your account?</p>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Modal>
    </div>
  )
}

export default ProfilePage

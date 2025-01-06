import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userDetail } from '../../../../service/userService'
import './UserDetail.css'

const UserDetail = ({ userId, onClose }) => {
  const dispatch = useDispatch()
  const { loading, userDetails, error } = useSelector((state) => state.user)
  const dataUser = userDetails?.data

  useEffect(() => {
    if (userId) {
      dispatch(userDetail(userId))
    }
  }, [dispatch, userId])

  if (loading) return <div className="user-detail-loading">Loading...</div>
  if (error) return <div className="user-detail-error">{error}</div>

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <h2>Chi tiết người dùng</h2>
        <button className="user-detail-close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
      {dataUser && (
        <div className="user-detail-content">
          <div className="user-detail-info">
            <p>
              <strong>Tên:</strong> {dataUser.name}
            </p>
            <p>
              <strong>Email:</strong> {dataUser.email}
            </p>
            <p>
              <strong>Điện thoại:</strong> {dataUser.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {dataUser.addresses}
            </p>
            <p>
              <strong>Vai trò:</strong> {dataUser.role}
            </p>
          </div>
          <div className="user-detail-section">
            <h3>Đã đặt</h3>
            {userDetails.booked && userDetails.booked.length > 0 ? (
              <ul className="user-detail-list">
                {userDetails.booked.map((tour, index) => (
                  <li key={index}>{tour}</li>
                ))}
              </ul>
            ) : (
              <p>Hiện chưa có tour nào được đặt.</p>
            )}
          </div>
          <div className="user-detail-section">
            <h3>Yêu thích</h3>
            {userDetails.favorite && userDetails.favorite.length > 0 ? (
              <ul className="user-detail-list">
                {userDetails.favorite.map((tour, index) => (
                  <li key={index}>{tour}</li>
                ))}
              </ul>
            ) : (
              <p>Hiện chưa có yêu thích tour nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetail

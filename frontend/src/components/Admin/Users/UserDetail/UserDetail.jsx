import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userDetail } from '../../../../service/userService'

const UserDetail = ({ userId, onClose }) => {
  const dispatch = useDispatch()
  const { loading, userDetails, error } = useSelector((state) => state.user)
  const dataUser = userDetails?.data

  useEffect(() => {
    if (userId) {
      dispatch(userDetail(userId))
    }
  }, [dispatch, userId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="user-detail">
      <button className="close-btn" onClick={onClose}>
        Đóng
      </button>{' '}
      {/* Nút đóng */}
      <h2>Chi tiết người dùng</h2>
      {dataUser && (
        <>
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
          <div>
            <strong>Đã đặt:</strong>{' '}
            {userDetails.booked && userDetails.booked.length > 0 ? (
              <ul>
                {userDetails.booked.map((tour, index) => (
                  <li key={index}>{tour}</li>
                ))}
              </ul>
            ) : (
              <p>Hiện chưa có tour nào được đặt.</p>
            )}
          </div>

          <div>
            <strong>Yêu thích:</strong>{' '}
            {userDetails.favorite && userDetails.favorite.length > 0 ? (
              <ul>
                {userDetails.favorite.map((tour, index) => (
                  <li key={index}>{tour}</li>
                ))}
              </ul>
            ) : (
              <p>Hiện chưa có yêu thích tour nào.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default UserDetail

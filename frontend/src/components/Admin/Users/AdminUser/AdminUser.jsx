import React, { useEffect, useState } from 'react'
import './AdminUser.css'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit, FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import {
  adminDeleteUser,
  getAllUser,
  updateRole
} from '../../../../service/adminService'
import UserDetail from '../UserDetail/UserDetail'

const User = () => {
  const [userId, setUserId] = useState(null)
  const dispatch = useDispatch()
  const [showDetail, setShowDetail] = useState(false)
  const [editUserId, setEditUserId] = useState(null)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [newRole, setNewRole] = useState('')
  const { users } = useSelector((state) => state.adminGetUser)
  console.log('userId', userId)

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  const listUser = users?.data

  const handleViewDetail = (id) => {
    setUserId(id)
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
  }

  const handleEditRole = (id, currentRole) => {
    setEditUserId(id)
    setNewRole(currentRole)
  }

  const handleDeleteUser = (id) => {
    setDeleteUserId(id)
  }

  const handleConfirmDelete = () => {
    if (deleteUserId) {
      const userId = deleteUserId
      dispatch(adminDeleteUser({ userId }))
        .then(() => {
          setDeleteUserId(null)
          dispatch(getAllUser())
        })
        .catch((error) => {
          console.error('Error deleting user:', error)
        })
    }
  }

  const handleCancelDelete = () => {
    setDeleteUserId(null)
  }

  const handleSaveRole = () => {
    if (editUserId && newRole) {
      const userId = editUserId
      const role = newRole
      dispatch(updateRole({ userId, role }))
      setEditUserId(null)
    } else {
      console.error('Invalid data for role update')
    }
  }

  return (
    <div className="employee-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Avatar</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Phân quyền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listUser?.map((user_item) => (
            <tr key={user_item._id}>
              <td>
                <img
                  src={user_item?.avatar?.url}
                  alt=""
                  className="list_avatar-user"
                />
              </td>
              <td>{user_item.name}</td>
              <td>{user_item.email}</td>
              <td>{user_item.phone}</td>
              <td>{user_item.addresses}</td>
              <td>{user_item.role}</td>
              <td className="action-cl">
                <button
                  onClick={() => handleViewDetail(user_item._id)}
                  className="edit-btn"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEditRole(user_item._id, user_item.role)}
                  className="edit-btn"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteUser(user_item._id)}
                  className="delete-btn"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userId && showDetail && (
        <div className="user_detail-cpn">
          <UserDetail userId={userId} onClose={handleCloseDetail} />
        </div>
      )}
      {editUserId && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Role</h3>
            <select
              value={newRole}
              className="role-select-itemmmm"
              onChange={(e) => setNewRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="vendor">Vendor</option>
            </select>
            <button onClick={handleSaveRole}>Save</button>
            <button onClick={() => setEditUserId(null)}>Cancel</button>
          </div>
        </div>
      )}
      {deleteUserId && (
        <div className="modal">
          <div className="modal-content">
            <h3>Delete User</h3>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default User

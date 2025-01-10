import React, { useEffect, useState } from 'react'
import './AdminTourist.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTourist } from '../../../../service/touristService'
import AdminTouristDetail from '../AdminTouristDetail/AdminTouristDetail'
import AdminAddTourist from '../AdminAddTourist/AdminAddTourist'
import AdminEditTourist from '../AdminEditTourist/AdminEditTourist'
import { deleteTourist } from '../../../../service/adminService'

const AdminTourist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tours, loading, error } = useSelector((state) => state.localTourist)
  const [selectedTour, setSelectedTour] = useState(false)
  const [isCreateVisible, setIsCreateVisible] = useState(false)
  const [idEdit, setIdEdit] = useState(false)
  console.log('selectedTour', selectedTour)
  useEffect(() => {
    dispatch(getAllTourist())
  }, [dispatch])
  console.log('getAllTourist', tours)
  const allTourists = tours?.data || []
  const handleDetail = (id) => {
    setSelectedTour(id)
  }
  const closeDetail = () => {
    setSelectedTour(false)
  }
  const handleCreate = () => {
    setIsCreateVisible(true)
  }

  const handleEdit = (id) => {
    setIdEdit(id)
  }
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn xoá tour này không?'
    )
    if (confirmDelete) {
      dispatch(deleteTourist({ id }))
        .unwrap()
        .then(() => {
          alert('Tour deleted successfully!')
          dispatch(getAllTourist())
        })
        .catch((error) => {
          alert(`Error: ${error}`)
        })
    }
  }

  return (
    <div className="tour-admin-container">
      <div>
        <button className="create-tour-btn" onClick={handleCreate}>
          Create
        </button>
      </div>
      <table className="tour-admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Price (VND)</th>
            <th>Địa chỉ</th>
            <th>Khu vực</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allTourists.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.name}</td>
              <td>{tour._id}</td>
              <td>{tour.price} VNĐ</td>
              <td>{tour?.location.provinceCity}</td>
              <td>{tour?.location.country}</td>
              <td className="tour-admin-actions">
                <button
                  className="btn btn-view"
                  onClick={() => handleDetail(tour)}
                >
                  Xem Chi Tiết
                </button>
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(tour._id)}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(tour._id)}
                  className="btn btn-delete"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTour && (
        <div className="tour-detail-overlay">
          <div className="tour-detail-modal">
            <button className="btn btn-close" onClick={closeDetail}>
              Close
            </button>
            <AdminTouristDetail data={selectedTour} />
          </div>
        </div>
      )}
      {isCreateVisible && <AdminAddTourist />}
      {idEdit && <AdminEditTourist touristId={idEdit} />}
    </div>
  )
}

export default AdminTourist

import React, { useEffect, useState } from 'react'
import './AdminTour.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTour } from '../../../../service/tourService'
import AdminTourDetail from '../AdminTourDetail/AdminTourDetail'
import AdminTourCreate from '../AdminTourCreate/AdminTourCreate'
import { deleteTour } from '../../../../service/adminService'

const AdminTour = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allTour, isLoading, error } = useSelector((state) => state.tour)
  const [selectedTour, setSelectedTour] = useState(null)
  const [isCreateVisible, setIsCreateVisible] = useState(false)

  useEffect(() => {
    dispatch(getAllTour())
  }, [dispatch])

  const tours = allTour?.tours || []
  const handleDetail = (id) => {
    setSelectedTour(id)
  }
  const closeDetail = () => {
    setSelectedTour(null)
  }
  const handleCreate = () => {
    setIsCreateVisible(true)
  }

  const closeCreate = () => {
    setIsCreateVisible(false)
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn xoá tour này không?'
    )
    if (confirmDelete) {
      dispatch(deleteTour({ id }))
        .unwrap()
        .then(() => {
          alert('Tour deleted successfully!')
          dispatch(getAllTour())
        })
        .catch((error) => {
          alert(`Error: ${error}`)
        })
    }
  }

  return (
    <div className="tour-admin-container">
      <div>
        <button onClick={handleCreate}>Create</button>
      </div>
      <table className="tour-admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Price (VND)</th>
            <th>Start Date</th>
            <th>Place of Departure</th>
            <th>Current Participants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.name}</td>
              <td>{tour.code}</td>
              <td>{tour.price} VNĐ</td>
              <td>{new Date(tour.start_date).toLocaleDateString()}</td>
              <td>{tour.place_departure}</td>
              <td>
                {tour.current_participants}/{tour.max_participants}
              </td>
              <td className="tour-admin-actions">
                <button
                  className="btn btn-view"
                  onClick={() => handleDetail(tour)}
                >
                  Xem Chi Tiết
                </button>
                <button className="btn btn-edit">Sửa</button>
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
            <AdminTourDetail tour={selectedTour._id} />
          </div>
        </div>
      )}
      {isCreateVisible && (
        <div className="tour-detail-overlay">
          <div className="tour-detail-modal">
            <button className="btn btn-close" onClick={closeCreate}>
              Close
            </button>
            <AdminTourCreate />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTour

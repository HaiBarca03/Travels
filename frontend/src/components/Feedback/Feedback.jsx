import React, { useState, useEffect } from 'react'
import { Dropdown, Menu, Modal, notification, Rate } from 'antd'
import { FaThumbsUp } from 'react-icons/fa'
import './Feedback.css'
import {
  getFeedBack,
  createFeedback,
  deleteFeedback,
  updateFeedback
} from '../../service/feedbackService'
import { useDispatch, useSelector } from 'react-redux'
import { EllipsisOutlined } from '@ant-design/icons'

const FeedbackSection = ({ data }) => {
  const tour_id = data.tour_id
  const tourist_id = data.tourist_id
  const hotel_id = data.hotel_id
  const restaurant_id = data.restaurant_id
  const dispatch = useDispatch()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [newRating, setNewRating] = useState(0)
  const { dataGetFeedBack } = useSelector((state) => state.feedback)
  const [editingComment, setEditingComment] = useState(null)
  const [updatedComment, setUpdatedComment] = useState('')
  const [updatedRating, setUpdatedRating] = useState(0)

  useEffect(() => {
    if (tour_id) {
      dispatch(getFeedBack({ entity: 'tour', entity_id: tour_id }))
    } else if (hotel_id) {
      dispatch(getFeedBack({ entity: 'hotel', entity_id: hotel_id }))
    } else if (restaurant_id) {
      dispatch(getFeedBack({ entity: 'restaurant', entity_id: restaurant_id }))
    } else if (tourist_id) {
      dispatch(getFeedBack({ entity: 'tourist', entity_id: tourist_id }))
    }
  }, [tour_id, hotel_id, restaurant_id, tourist_id, dispatch])

  useEffect(() => {
    if (dataGetFeedBack && dataGetFeedBack.length > 0) {
      setComments(dataGetFeedBack)
    } else {
      setComments([])
    }
  }, [dataGetFeedBack])

  const handleDeleteComment = (commentId) => {
    let dataBody = {}

    if (tour_id) {
      dataBody = { tour_id: tour_id, _id: commentId }
    } else if (tourist_id) {
      dataBody = { tourist_id: tourist_id, _id: commentId }
    } else if (hotel_id) {
      dataBody = { hotel_id: hotel_id, _id: commentId }
    } else if (restaurant_id) {
      dataBody = { restaurant_id: restaurant_id, _id: commentId }
    }

    if (dataBody._id) {
      dispatch(deleteFeedback({ data: dataBody }))
        .then(() => {
          const entity = tour_id
            ? 'tour'
            : tourist_id
            ? 'tourist'
            : hotel_id
            ? 'hotel'
            : restaurant_id
            ? 'restaurant'
            : null

          if (entity) {
            dispatch(
              getFeedBack({
                entity: entity,
                entity_id: tour_id || tourist_id || hotel_id || restaurant_id
              })
            )
          }
        })
        .catch((error) => {
          console.error('Error deleting comment:', error)
        })
    } else {
      console.error('No valid entity found to delete comment')
    }
  }

  const handleEditComment = (comment) => {
    setEditingComment(comment)
    setUpdatedComment(comment.comment)
    setUpdatedRating(comment.rating)
  }

  const handleUpdateComment = () => {
    let dataBody = {
      _id: editingComment._id,
      comment: updatedComment,
      rating: updatedRating
    }

    // Cập nhật dựa trên ID của entity
    if (tour_id) {
      dataBody.tour_id = tour_id
    } else if (tourist_id) {
      dataBody.tourist_id = tourist_id
    } else if (hotel_id) {
      dataBody.hotel_id = hotel_id
    } else if (restaurant_id) {
      dataBody.restaurant_id = restaurant_id
    }

    dispatch(updateFeedback({ data: dataBody }))
      .then(() => {
        setEditingComment(null)
        setUpdatedComment('')
        setUpdatedRating(0)
        const entity = tour_id
          ? 'tour'
          : tourist_id
          ? 'tourist'
          : hotel_id
          ? 'hotel'
          : restaurant_id
          ? 'restaurant'
          : null

        if (entity) {
          dispatch(
            getFeedBack({
              entity: entity,
              entity_id: tour_id || tourist_id || hotel_id || restaurant_id
            })
          )
        }
      })
      .catch((err) => {
        console.error('Error updating feedback:', err)
      })
  }

  const handleSubmitComment = async () => {
    if (!newComment || newRating === 0) {
      alert('Please provide both a comment and a rating.')
      return
    }

    const feedbackData = {
      comment: newComment,
      rating: newRating
    }

    // Thêm ID tương ứng với entity vào dữ liệu feedback
    if (tour_id) {
      feedbackData.tour_id = tour_id
    } else if (tourist_id) {
      feedbackData.tourist_id = tourist_id
    } else if (hotel_id) {
      feedbackData.hotel_id = hotel_id
    } else if (restaurant_id) {
      feedbackData.restaurant_id = restaurant_id
    }

    try {
      const res = await dispatch(createFeedback(feedbackData))

      if (res.payload && res.payload.status === 'error') {
        notification.error({
          message: 'Feedback thất bại',
          description: 'Bạn phải trải nghiệm trước khi được feedback'
        })
      } else {
        setNewComment('')
        setNewRating(0)
        const entity = tour_id
          ? 'tour'
          : tourist_id
          ? 'tourist'
          : hotel_id
          ? 'hotel'
          : restaurant_id
          ? 'restaurant'
          : null

        if (entity) {
          dispatch(
            getFeedBack({
              entity: entity,
              entity_id: tour_id || tourist_id || hotel_id || restaurant_id
            })
          )
        }
      }
    } catch (err) {
      console.error('Error submitting feedback:', err)
      notification.error({
        message: 'Error',
        description: 'Có lỗi xảy ra khi gửi feedback.'
      })
    }
  }

  const handleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, like: comment.like + 1 }
          : comment
      )
    )
  }

  const menu = (comment) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEditComment(comment)}>
        Update
      </Menu.Item>
      <Menu.Item
        key="2"
        danger
        onClick={() => handleDeleteComment(comment._id)}
      >
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="feedback-container">
      <h2 className="feedback-header">Phản hồi - đánh giá</h2>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <img
              src={comment.user.avatar || 'https://via.placeholder.com/50'}
              alt={comment.user.name}
              className="user-avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <strong>{comment.user.name}</strong>
                <Dropdown overlay={menu(comment)} trigger={['click']}>
                  <EllipsisOutlined className="ellipsis-icon" />
                </Dropdown>
              </div>
              <p>{comment.comment}</p>
              <div className="comment-footer">
                <div className="rating-container">
                  <span className="rating-label">Rating: </span>
                  <Rate disabled value={comment.rating} />
                </div>
                <div
                  className="like-container"
                  onClick={() => handleLike(comment._id)}
                >
                  <FaThumbsUp className="like-icon" />
                  <span className="likes">{comment.like}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <div className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="rating-input">
          <span>Rate this tour:</span>
          <Rate value={newRating} onChange={(value) => setNewRating(value)} />
        </div>
        <button className="submit-button" onClick={handleSubmitComment}>
          Submit
        </button>
      </div>

      <Modal
        title="Edit Comment"
        visible={!!editingComment}
        onOk={handleUpdateComment}
        onCancel={() => setEditingComment(null)}
        okText="Update"
      >
        <textarea
          className="comment-input"
          placeholder="Edit your comment..."
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
        ></textarea>
        <div className="rating-input">
          <span>Update Rating:</span>
          <Rate
            value={updatedRating}
            onChange={(value) => setUpdatedRating(value)}
          />
        </div>
      </Modal>
    </div>
  )
}

export default FeedbackSection

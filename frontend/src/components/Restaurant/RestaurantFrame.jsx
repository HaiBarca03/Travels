import React, { useEffect, useState } from 'react'
import { Rate, Card } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import './RestaurantFrame.css'
import { getResById } from '../../service/restaurantService'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addFavorite,
  deleteFavorite,
  favoritesFromUser
} from '../../service/userService'

const RestaurantFrame = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { restaurantDetail } = useSelector((state) => state.restaurant)
  const { user, favoritesUser } = useSelector((state) => state.user)
  const [favorites, setFavorites] = useState([])

  const listFavoritesRestaurant = favoritesUser?.favorite?.list_restaurant || []
  const searchData = Array.isArray(data) ? data : []

  useEffect(() => {
    dispatch(favoritesFromUser())
  }, [user])

  useEffect(() => {
    const favoriteIds = listFavoritesRestaurant.map((fav) => fav._id)
    setFavorites(favoriteIds)
  }, [listFavoritesRestaurant])

  const handleFavoriteToggle = async (id) => {
    try {
      if (favorites.includes(id)) {
        await dispatch(deleteFavorite({ restaurantId: id }))
        setFavorites((prevFavorites) =>
          prevFavorites.filter((favId) => favId !== id)
        )
      } else {
        await dispatch(addFavorite({ restaurantId: id }))
        setFavorites((prevFavorites) => [...prevFavorites, id])
      }
    } catch (error) {
      console.error('Failed to update favorites:', error)
    }
  }

  const handleRes = async (id) => {
    try {
      const response = await dispatch(getResById(id)).unwrap()
      navigate('/restaurant-detail', { state: { restaurantDetail: response } })
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error)
    }
  }

  return (
    <div className="restaurant-container">
      {searchData?.length > 0 ? (
        searchData?.map((restaurantData) => {
          const isFavorite = favorites.includes(restaurantData._id)
          return (
            <Card
              className="restaurant-card-ctn"
              key={restaurantData._id}
              hoverable
              style={{ width: 300, position: 'relative' }}
              cover={
                <img
                  alt="restaurant"
                  src={restaurantData?.images?.[0]?.url || 'placeholder.jpg'}
                />
              }
              onClick={() => handleRes(restaurantData._id)}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  fontSize: 24,
                  color: isFavorite ? 'red' : '#fff',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleFavoriteToggle(restaurantData._id)
                }}
              >
                {isFavorite ? <HeartFilled /> : <HeartOutlined />}
              </div>
              <h3 className="title_name-res">{restaurantData.name}</h3>
              <p>{restaurantData.address}</p>
              <p>{restaurantData.location?.provinceCity}</p>
              <p>
                <strong>Type:</strong> {restaurantData.type}
              </p>
              <p>
                <strong>Price Range:</strong> {restaurantData.price} VND
              </p>
              <div>
                <strong>Rating: </strong>
                <Rate disabled defaultValue={restaurantData.rating} />
              </div>
            </Card>
          )
        })
      ) : (
        <p>Không có dữ liệu được tìm thấy.</p>
      )}
    </div>
  )
}

export default RestaurantFrame

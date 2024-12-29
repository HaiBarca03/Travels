import { Collapse } from 'antd'
import HotelFavorite from '../HotelFavorite/HotelFavorite'
import TouristFavorite from '../TouristFavorite/TouristFavorite'
import LocationFavorite from '../LocationFavorite/LocationFavorite'
import TourFavorite from '../TourFavorite/TourFavorite'
import RestaurantFavorite from '../RestaurantFavorite/RestaurantFavorite'
import './FavoritesSection.css'

const { Panel } = Collapse

const FavoritesSection = ({
  listFavoritesTours,
  listFavoritesTourist,
  listFavoritesRestaurant,
  listFavoritesHotel,
  listFavoritesLocation
}) => {
  return (
    <Collapse accordion className="favorites-collapse">
      <Panel header="Favorite Tours" key="5">
        <TourFavorite data={listFavoritesTours} />
      </Panel>
      <Panel header="Favorite Tourist Spots" key="3">
        <TouristFavorite data={listFavoritesTourist} />
      </Panel>
      <Panel header="Favorite Restaurants" key="1">
        <RestaurantFavorite data={listFavoritesRestaurant} />
      </Panel>
      <Panel header="Favorite Hotels" key="2">
        <HotelFavorite data={listFavoritesHotel} />
      </Panel>
      <Panel header="Favorite Locations" key="4">
        <LocationFavorite data={listFavoritesLocation} />
      </Panel>
    </Collapse>
  )
}

export default FavoritesSection

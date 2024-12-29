import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducer/user/userSlice'
import localReducer from './reducer/local/localSlice'
import touristReducer from './reducer/tourist/touristSlice'
import hotelReducer from './reducer/hotel/hotelSlice'
import hotelByLocalReducer from './reducer/hotel/hotelSlice'
import restaurantReducer from './reducer/restaurant/restaurantSlice'
import restaurantByLocalReducer from './reducer/restaurant/restaurantSlice'
import adminGetAllUser from './reducer/admin/adminUserSlice'
import adminGetLocal from './reducer/admin/adminLocalSlice'
import adminHotel from './reducer/admin/adminHotel'
import tourReducer from './reducer/tour/tourPlace'

const userPersistConfig = {
  key: 'user',
  storage
}
// const localPersistConfig = {
//     key: 'local',
//     storage,
// }

const persistedUser = persistReducer(userPersistConfig, userReducer)
// const persistedLocal = persistReducer(localPersistConfig, localReducer)

export const store = configureStore({
  reducer: {
    user: persistedUser,
    local: localReducer,
    localTourist: touristReducer,
    hotel: hotelReducer,
    hotelByLocal: hotelByLocalReducer,
    restaurant: restaurantReducer,
    restaurantByLocal: restaurantByLocalReducer,
    tour: tourReducer,
    //admin
    adminGetUser: adminGetAllUser,
    adminGetLocal: adminGetLocal,
    adminHotel: adminHotel
  }
})

export const persistor = persistStore(store)

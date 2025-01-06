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
import bookingReducer from './reducer/booking/bookingSlice'
import paymentReducer from './reducer/payment/paymentSlice'
import feedbackReducer from './reducer/feedback/feedbackSlice'
const userPersistConfig = {
  key: 'user',
  storage
}

const persistedUser = persistReducer(userPersistConfig, userReducer)

export const store = configureStore({
  reducer: {
    // user
    user: persistedUser,
    // local
    local: localReducer,
    localTourist: touristReducer,
    // hotel
    hotel: hotelReducer,
    hotelByLocal: hotelByLocalReducer,
    // restaurant
    restaurant: restaurantReducer,
    restaurantByLocal: restaurantByLocalReducer,
    // tour
    tour: tourReducer,
    //admin
    adminGetUser: adminGetAllUser,
    adminGetLocal: adminGetLocal,
    adminHotel: adminHotel,
    // booking
    booking: bookingReducer,
    // payment
    payment: paymentReducer,
    // feedback
    feedback: feedbackReducer
  }
})

export const persistor = persistStore(store)

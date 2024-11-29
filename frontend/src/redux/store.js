import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducer/user/userSlice'
import localReducer from './reducer/local/localSlice'
import touristReducer from './reducer/tourist/touristSlice'
import touristDetailReducer from './reducer/tourist/touristDetail'
import hotelReducer from './reducer/hotel/hotelSlice'

const userPersistConfig = {
    key: 'user',
    storage,
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
        touristDetail: touristDetailReducer,
        hotel: hotelReducer,
    },
})

export const persistor = persistStore(store)
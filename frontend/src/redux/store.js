import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducer/user/userSlice'

const userPersistConfig = {
    key: 'user',
    storage,
}


const persistedUser = persistReducer(userPersistConfig, userReducer)

export const store = configureStore({
    reducer: {
        user: persistedUser,
    },
})

export const persistor = persistStore(store)
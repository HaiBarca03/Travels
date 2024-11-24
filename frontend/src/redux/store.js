import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducer/user/userSlice'
import localReducer from './reducer/local/localSlice'

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
    },
})

export const persistor = persistStore(store)
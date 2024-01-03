import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import chatReducer from './chat'
import userReducer from './user'
import usersReducer from './users'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    chat: chatReducer, user: userReducer, users: usersReducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);
// export default configureStore({
//     reducer: {
//         chat: chatReducer,
//         user: userReducer,
//         users: usersReducer,
//     }
// })
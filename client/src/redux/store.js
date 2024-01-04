import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import chatReducer from './chat'
import userReducer from './user'
import usersReducer from './users'
import storageSession from 'redux-persist/lib/storage/session'
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['user'], //only persist user reducer
    blacklist: ['chat', 'users'] // don't persist chat and users list
}
const rootReducer = combineReducers({
    chat: chatReducer, user: userReducer, users: usersReducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);

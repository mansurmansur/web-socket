import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import chatReducer from './chat'
import userReducer from './user'
import usersReducer from './users'
import userSelectedReducer from './userSelected'
import storageSession from 'redux-persist/lib/storage/session'
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['user','userSelected'], //only persist user reducer
    blacklist: ['chat', 'users'] // don't persist chat and users list
}
const rootReducer = combineReducers({
    'chat': chatReducer, 'user': userReducer, 'users': usersReducer, 'userSelected': userSelectedReducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);

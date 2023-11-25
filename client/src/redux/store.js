import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './chat'
import userReducer from './user'
import usersReducer from './users'

export default configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer,
        users: usersReducer
    }
})
import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './chat'
import userReducer from './user'
import messageReducer from './message'

export default configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer,
        message: messageReducer,
        
    }
})
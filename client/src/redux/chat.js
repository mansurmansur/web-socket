import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chatHistory',
    initialState: {},
    reducers: {
        updateChatHistory: (state, action) => {
            //update chatHistory
            const {from, message} = action.payload;

            if(!state[from.id]){
                state[from.id] = [];
            }

            state[from.id].push({
                sender: from.username,
                text: message
            })
        }
    },
})

export const {updateChatHistory} = chatSlice.actions
export default chatSlice.reducer

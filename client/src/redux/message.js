import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'message',
    initialState: '',
    reducers: {
        updateMessage: (state, action) => {
            state = action.payload;
        },
    }
});

export const {updateMessage} = messageSlice.actions
export default messageSlice.reducer
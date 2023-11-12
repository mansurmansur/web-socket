import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        isUsernameSent: false,
        userSelected: {isUserSelected: false, user: null}
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        updateIsUsernameSent: (state, action) => {
            state.isUsernameSent = action.payload;
        },
        updateIsUserSelected: (state, action) => {
            state.userSelected = action.payload;
        },
    }
});

export const {setUsername, updateIsUserSelected, updateIsUsernameSent} = userSlice.actions
export default userSlice.reducer
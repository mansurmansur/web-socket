import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        id: '',
        isUsernameSent: false,
        userSelected: {isUserSelected: false, user: null}
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        updateIsUsernameSent: (state, action) => {
            state.isUsernameSent = action.payload;
        },
        updateIsUserSelected: (state, action) => {
            state.userSelected = action.payload;
        },
    }
});

export const {setUsername, setId, updateIsUserSelected, updateIsUsernameSent} = userSlice.actions
export default userSlice.reducer
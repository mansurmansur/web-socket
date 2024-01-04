import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        id: '',
        userSelected: {isUserSelected: false, user: null}
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        updateIsUserSelected: (state, action) => {
            state.userSelected = action.payload;
        },
    }
});

export const {setUsername, setId, updateIsUserSelected} = userSlice.actions
export default userSlice.reducer
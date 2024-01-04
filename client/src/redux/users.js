import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeUsers: [{username: "server", id: '12345'}]
}

export const usersSlice = createSlice({
    name: 'activeUsers',
    initialState,
    reducers: {
        updateActiveUsers: (state, action) => 
        {
            state.activeUsers = [...action.payload]
        },
        getUser: (state, action) => {
            return state.activeUsers.filter(user => user.id === action.payload)
        }
    }
});

export const {updateActiveUsers, getUser } = usersSlice.actions;
export default usersSlice.reducer
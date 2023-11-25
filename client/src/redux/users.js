import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeUsers: []
}

export const usersSlice = createSlice({
    name: 'activeUsers',
    initialState,
    reducers: {
        updateActiveUsers: (state, action) => 
        {
            state.activeUsers = [...action.payload]
        },
    }
});

export const {updateActiveUsers } = usersSlice.actions
export default usersSlice.reducer
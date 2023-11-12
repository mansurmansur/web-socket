import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'activeUsers',
    initialState: [],
    reducers: {
        updateActiveUsers: (state, action) => {
            state = action.payload;
        },
    }
});

export const {updateActiveUsers0 } = usersSlice.actions
export default usersSlice.reducer
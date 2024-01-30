import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeUsers: []
}

export const usersSlice = createSlice({
    name: 'activeUsers',
    initialState,
    reducers: {
        updateActiveUsers:  (state, action) => 
        {
            state.activeUsers = [...action.payload]
        },
        getUser: (state, action) => {
            return state.activeUsers.filter(user => user.id === action.payload)
        },
        updateIsOnline:(state, action)=> {
            const onlineUsers = action.payload;
            let tempList = [...state.activeUsers];
           
            tempList = tempList.map(user => {
                if (onlineUsers.includes(user.id)) {
                    return { ...user, isOnline: true }; // Create a new user object
                } else {
                    return user; // No change for users not in the online list
                }
            })

            state.activeUsers = [...tempList]
        }
    }
});

export const {updateActiveUsers, getUser, updateIsOnline } = usersSlice.actions;
export default usersSlice.reducer

// selector that returns a single user
export const selectedUserInfo = (userId) => createSelector(
    [(state) => state.activeUsers, userId],
    (activeUsers) => activeUsers.find(user => user.id === userId)
)
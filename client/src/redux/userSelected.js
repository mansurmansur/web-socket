import { createSlice } from "@reduxjs/toolkit";

export const userSelectedSlice = createSlice({
  name: 'userSelected',
  initialState: {
    isUserSelected: false,
    user: null,
  },
  reducers: {
    updateIsUserSelectedStatus: (state, action) => {
      state.isUserSelected = action.payload;
    },
    updateSelectedUser: (state, action) => {
      state.user = action.payload;
    },
  }
});

export const { updateIsUserSelectedStatus, updateSelectedUser } = userSelectedSlice.actions;
export default userSelectedSlice.reducer;
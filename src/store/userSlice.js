// app/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // The complete Firebase user object will be stored here
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload; // Store the complete user object
    },
    clearUser: (state) => {
      return null; // Clear the user object on logout
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

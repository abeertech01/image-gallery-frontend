import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  images: [],
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser(state, action) {
      state.user = action.payload
    },
    saveImages(state, action) {
      state.images = action.payload
    },
  },
})

export default authSlice
export const { saveUser, saveImages } = authSlice.actions

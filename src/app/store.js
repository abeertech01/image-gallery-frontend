import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { imageApi } from "./service/image"
import authSlice from "./reducer/auth"

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(imageApi.middleware),
})

setupListeners(store.dispatch)

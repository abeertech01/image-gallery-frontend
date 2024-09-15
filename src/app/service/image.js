import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const imageApi = createApi({
  reducerPath: "image",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api` }),
  tagTypes: ["Images"],

  endpoints: (builder) => ({
    getImages: builder.query({
      query: () => ({
        url: "/image/images",
        credentials: "include",
      }),
      providesTags: ["Images"],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/image/upload",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Images"],
    }),
    deleteImages: builder.mutation({
      query: (imageIds) => ({
        url: "/image/delete",
        method: "DELETE",
        body: { imageIds },
        credentials: "include",
      }),
      invalidatesTags: ["Images"],
    }),
  }),
})

export const {
  useGetImagesQuery,
  useUploadImageMutation,
  useDeleteImagesMutation,
} = imageApi

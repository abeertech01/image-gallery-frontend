import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useUploadImageMutation } from "../app/service/image"

function ImageUploadForm({ uploadFormOpen }) {
  const [uploading, setUploading] = useState(false)
  const [uploadImage, { isSuccess, error: upError }] = useUploadImageMutation()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setUploading(true)

    const formData = new FormData()

    formData.append("image", data.image[0])
    formData.append("title", data.title)
    formData.append("description", data.description)

    try {
      const result = await uploadImage(formData).unwrap()

      console.log(result)
      reset() // Reset form after success
      uploadFormOpen()
    } catch (error) {
      console.error("Error uploading image:", error.message)
    } finally {
      setUploading(false)
    }
  }

  // Watch for the selected file
  const selectedFile = watch("image")

  return (
    <div className="absolute z-50 left-[50vw] top-[50vh] -translate-x-[50%] -translate-y-[50%] px-5 py-5 bg-zinc-700 min-w-[24rem]">
      <h1 className="text-2xl mb-4">Upload an Image</h1>

      {/* Form to upload image */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title input */}
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full p-2 bg-zinc-800 outline-none rounded"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Description input */}
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-2 bg-zinc-800 outline-none rounded"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
        </div>

        {/* File input for the image */}
        <div>
          <label className="block mb-2">Select Image</label>
          <input
            type="file"
            {...register("image", {
              required: true,
              validate: {
                checkType: (value) => {
                  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
                  return value[0] && allowedTypes.includes(value[0].type)
                },
              },
            })}
            accept="image/jpeg, image/jpg, image/png" // Specify file types here
            className="w-full p-2 bg-zinc-800 outline-none rounded"
          />
          {errors.image?.type === "required" && (
            <p className="text-red-500">Image is required</p>
          )}
          {errors.image?.type === "checkType" && (
            <p className="text-red-500">
              Only JPEG, JPG, or PNG files are allowed
            </p>
          )}
        </div>

        {/* Preview selected image */}
        {selectedFile && selectedFile.length > 0 && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(selectedFile[0])}
              alt="Selected"
              className="w-full h-32 object-cover"
            />
          </div>
        )}

        {/* Submit button */}
        <button
          disabled={uploading}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  )
}

export default ImageUploadForm

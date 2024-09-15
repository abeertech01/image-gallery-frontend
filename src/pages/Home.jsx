import React, { useCallback, useState } from "react"
import Gallery from "../components/Gallery"
import { useDispatch } from "react-redux"
import AddImageModal from "../components/AddImageModal"
import { useDeleteImagesMutation } from "../app/service/image"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import { saveUser } from "../app/reducer/auth"

function Home() {
  if (!localStorage.getItem("ig-user")) return <Navigate to={"/login"} />

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [deleteSelectedImages, { isLoading: deletingImages }] =
    useDeleteImagesMutation()

  const uploadFormOpen = useCallback(() => {
    setShowUploadForm(!showUploadForm)
  }, [showUploadForm])

  const deleteImages = useCallback(async () => {
    console.log(selectedImages)
    await deleteSelectedImages(selectedImages)
  }, [selectedImages])

  const signout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/auth/logout`, {
        withCredentials: true,
      })
      localStorage.removeItem("ig-user")
      dispatch(saveUser(null))
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-zinc-900 sm:w-[480px] md:w-[768px] lg:w-[1024px] min-h-screen mx-auto px-6 py-4">
      {showUploadForm && <AddImageModal uploadFormOpen={uploadFormOpen} />}
      <h1 className="text-3xl font-semibold mb-4">Image Gallary</h1>
      <div className="mb-4 px-4 py-2 bg-zinc-800 rounded-lg flex items-start lg:items-center gap-4 justify-between">
        <div className="flex lg:flex-row flex-col items-start gap-4">
          <button onClick={uploadFormOpen} className="underline">
            upload image
          </button>
          {selectedImages.length > 0 && (
            <button onClick={deleteImages} className="underline">
              {deletingImages ? "Deleting Images..." : "Delete Selected Images"}
            </button>
          )}
        </div>

        <div onClick={signout} className="flex gap-4">
          <button className="underline">Sign Out</button>
        </div>
      </div>

      <Gallery setSelectedImages={setSelectedImages} />
    </div>
  )
}

export default Home

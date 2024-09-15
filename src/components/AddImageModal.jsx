import React from "react"
import ImageUploadForm from "./ImageUploadForm"

function AddImageModal({ uploadFormOpen }) {
  return (
    <>
      <div
        onClick={uploadFormOpen}
        className="fixed z-50 top-0 right-0 bottom-0 left-0 bg-zinc-900/50 w-screen h-screen"
      ></div>
      <ImageUploadForm uploadFormOpen={uploadFormOpen} />
    </>
  )
}

export default AddImageModal

import React, { useEffect } from "react"
import ImageItem from "./ImageItem"
import { useGetImagesQuery } from "../app/service/image"
import { useDispatch } from "react-redux"
import { saveImages } from "../app/reducer/auth"

function Gallery({ setSelectedImages }) {
  const dispatch = useDispatch()
  const { data, isLoading } = useGetImagesQuery()

  useEffect(() => {
    if (!isLoading) dispatch(saveImages(data.images))
  }, [data])

  return (
    <div className="">
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {data &&
          data.images.map((image, index) => (
            <ImageItem
              key={image._id}
              image={image}
              index={index}
              setSelectedImages={setSelectedImages}
            />
          ))}
      </ul>
    </div>
  )
}

export default Gallery

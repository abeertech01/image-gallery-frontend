import React, { useEffect, useState } from "react"
import { ImCheckboxUnchecked } from "react-icons/im"
import { ImCheckboxChecked } from "react-icons/im"

function ImageItem({ image, index, setSelectedImages }) {
  const [sum, setSum] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    if (sum !== 0) {
      if (selected) {
        setSelectedImages((prev) => [...prev, image._id])
      } else {
        setSelectedImages((prev) => prev.filter((id) => id !== image._id))
      }
    }

    setSum((prev) => prev + 1)
  }, [selected])

  return (
    <li
      onMouseEnter={() => screenSize.width >= 1024 && setHovered(true)}
      onMouseLeave={() =>
        !selected && screenSize.width >= 1024 && setHovered(false)
      }
      onClick={() => screenSize.width < 1024 && setHovered((prev) => !prev)}
      className={`${
        index === 0 && "col-span-2 row-span-2"
      } relative z-40 overflow-hidden`} // Add relative class to the <li>
    >
      {/* Black overlay */}
      <div
        className={`absolute inset-0 bg-black/60 rounded-lg p-2 lg:p-6 transition-opacity duration-400 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Your content goes here */}
        <div className="flex items-center justify-between mb-1 lg:mb-4 text-normal lg:text-2xl">
          <h1 className="font-semibold capitalize">{image.title}</h1>
          <div
            onClick={(e) => {
              e.stopPropagation() // Prevent event bubbling
              setSelected(!selected)
            }}
            className="cursor-pointer"
          >
            {selected ? (
              <span className="">
                <ImCheckboxChecked />
              </span>
            ) : (
              <span className="">
                <ImCheckboxUnchecked />
              </span>
            )}
          </div>
        </div>
        <p className="text-xs lg:text-base">
          <strong>Description:</strong> {image.description}
        </p>
      </div>

      <img
        src={image.imageUrl}
        alt={image.name}
        className="h-full rounded-lg object-cover aspect-video"
      />
    </li>
  )
}

export default ImageItem

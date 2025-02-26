"use client"

import { useState } from "react"
import Image from "next/image"

interface PhotoGalleryProps {
  photos: string[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)

  return (
    <div className="mb-8">
      <div className="relative h-96 mb-4">
        <Image
          src={photos[currentPhoto] || "/placeholder.svg"}
          alt={`House photo ${currentPhoto + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhoto(index)}
            className={`flex-shrink-0 ${index === currentPhoto ? "ring-2 ring-blue-500" : ""}`}
          >
            <Image
              src={photo || "/placeholder.svg"}
              alt={`House photo ${index + 1}`}
              width={100}
              height={100}
              objectFit="cover"
              className="rounded"
            />
          </button>
        ))}
      </div>
    </div>
  )
}


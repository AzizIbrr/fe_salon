import React from "react"

const FeedCard = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md h-full">
      <div className="relative aspect-video">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FE_Test-WQGk3hBf7UTuj3pUjoKVstH4wqRxty.png"
          alt="Beauty treatment"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-800">5 Advice for your beauty routine</h4>
        <p className="text-sm text-gray-600 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur. At augue scelerisque rutrum id. Tellus adipiscing massa ac in
          tristique interdum at.
        </p>
      </div>
    </div>
  )
}

export default FeedCard


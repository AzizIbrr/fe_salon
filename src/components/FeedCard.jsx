import React from "react"

export default function FeedCard() {
  return (
            <div className="min-w-[280px] min-h-[300px] bg-white shadow-lg rounded-lg overflow-hidden h-full">
              <img
                src="https://placehold.co/250"
                alt="Beauty Advice"
                className="w-full h-50 object-cover p-2 rounded-2xl"
              />
              <div className="p-4 h-full flex flex-col justify-between">
                <h4 className="font-bold text-sm mb-2">5 Advice for your beauty routine</h4>
                <p className="text-xs text-gray-600">
                  Lorem ipsum dolor sit amet consectetur. At augue scelerisque rutrum id.
                </p>
              </div>
            </div>
  )
}


import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, ChevronRight, Bookmark } from "lucide-react"

const LocationPage = () => {
  const navigate = useNavigate()
  const [selectedLocation, setSelectedLocation] = useState("")
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/locations")
        const result = await response.json()
        if (result.success) {
          setLocations(result.data)
        }
      } catch (error) {
        console.error("Error fetching locations:", error)
      }
    }

    fetchLocations()
  }, [])

  const handleSelect = () => {
    if (selectedLocation) {
      const selectedLocationData = locations.find(location => location.id === selectedLocation)
      navigate("/treatment", { state: { location: selectedLocationData } })
    }
  }

  return (
    <div className="min-h-screen bg-[#D9B061]">
      <div className="w-full min-h-screen md:max-w-[540px] mx-auto bg-white flex flex-col">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#D9B061] text-center pt-8 mb-6">Select Location</h1>

        {/* Location List */}
        <div className="flex-1 px-4 space-y-3">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all ${
                selectedLocation === location.id
                  ? "bg-[#D9B061] text-white border-[#D9B061]"
                  : "bg-white text-gray-800 border-gray-200 hover:border-[#D9B061]"
              }`}
            >
              <MapPin className="w-5 h-5 mt-1 shrink-0" />
              <div className="text-left">
                <p className="font-semibold">{location.name}</p>
                <p className="text-sm opacity-90">{location.full_address}</p>
              </div>
              <Bookmark className="w-5 h-5 ml-auto shrink-0" />
            </button>
          ))}
        </div>

        {/* Bottom Buttons */}
        <div className="p-4 space-y-3">
          <button
            onClick={handleSelect}
            className="w-full flex items-center justify-between bg-[#D9B061] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            disabled={!selectedLocation}
          >
            <span>Select</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 rounded-xl font-semibold border border-[#D9B061] text-[#D9B061]"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationPage
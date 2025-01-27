import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft, Star, ChevronRight } from "lucide-react"

const TherapistPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { location: selectedLocation, treatments, selectedDate, selectedTime } = location.state || {}
  const [selectedTherapists, setSelectedTherapists] = useState({})
  const [therapists, setTherapists] = useState([])

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/get-therapist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location_id: selectedLocation.id,
            date: selectedDate,
            start_time: selectedTime,
            treatment_id: treatments.map(treatment => treatment.id),
          }),
        })
        const result = await response.json()
        if (result.success) {
          setTherapists(result.data)
          console.log("Fetched Therapists:", result.data)
        }
      } catch (error) {
        console.error("Error fetching therapists:", error)
      }
    }

    if (selectedLocation && selectedDate && selectedTime && treatments.length > 0) {
      fetchTherapists()
    }
  }, [selectedLocation, selectedDate, selectedTime, treatments])

  const toggleTherapist = (treatmentName, therapistId) => {
    setSelectedTherapists((prev) => ({
      ...prev,
      [treatmentName]: prev[treatmentName] === therapistId ? null : therapistId,
    }))
  }

  const handleNext = () => {
    if (Object.keys(selectedTherapists).length === treatments.length) {
      console.log("selected Therapists:", selectedTherapists)
      console.log("Data Therapist:", therapists)
      navigate("/customer", { state: { location: selectedLocation, treatments, selectedDate, selectedTime, selectedTherapists, therapists } })
    }
  }

  const formatPrice = (price) => {
    return `IDR ${price}`
  }

  return (
    <div className="min-h-screen bg-[#D9B061]">
      <div className="w-full min-h-screen md:max-w-[540px] mx-auto bg-white flex flex-col">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#D9B061] text-center pt-8 mb-6">Select Therapist</h1>

        {/* Therapist List */}
        <div className="flex-1 px-4 space-y-6 pb-32">
          {therapists.map((treatment) => (
            <div key={treatment.treatment_id} className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Therapist for {treatment.treatment_name}</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                {treatment.therapists.map((therapist) => (
                  <button
                    key={therapist.id}
                    onClick={() => toggleTherapist(treatment.treatment_name, therapist.id)}
                    className={`snap-center shrink-0 w-[280px] rounded-3xl overflow-hidden transition-all ${
                      selectedTherapists[treatment.treatment_name] === therapist.id ? "bg-[#D9B061]" : "bg-white shadow-lg"
                    }`}
                  >
                    <div className="relative">
                      <div className="aspect-[4/3] relative rounded-t-3xl overflow-hidden">
                        <img
                          src={therapist.image || "/placeholder.svg"}
                          alt={therapist.name}
                          className="w-full h-full object-cover p-4 rounded-3xl"
                        />
                      </div>
                      <div className="p-4">
                        <h3
                          className={`text-2xl font-semibold mb-1 ${
                            selectedTherapists[treatment.treatment_name] === therapist.id ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {therapist.name}
                        </h3>
                        <div
                          className={`grid grid-cols-2 gap-4 ${
                            selectedTherapists[treatment.treatment_name] === therapist.id ? "text-white" : "text-gray-600"
                          }`}
                        >
                          <div className="text-left">
                            <span className="text-lg font-medium">{formatPrice(therapist.price)}</span>
                          </div>
                          <div
                            className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-lg justify-center ${
                              selectedTherapists[treatment.treatment_name] === therapist.id ? "bg-white text-[#D9B061]" : "bg-[#D9B061] text-white"
                            }`}
                          >
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-md font-medium">
                              {therapist.rating} ({therapist.total_treatment})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 space-y-3 bg-white md:max-w-[540px] md:mx-auto">
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-between bg-[#D9B061] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            disabled={Object.keys(selectedTherapists).length !== treatments.length}
          >
            <span>{Object.keys(selectedTherapists).length}/{treatments.length} Therapists Selected</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-[#D9B061] text-[#D9B061] gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TherapistPage
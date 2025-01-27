import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Check, ChevronRight, ChevronLeft } from "lucide-react"

const TreatmentPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { location: selectedLocation } = location.state || {}
  const [selectedTreatments, setSelectedTreatments] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/treatments?location_id=${selectedLocation.id}`)
        const result = await response.json()
        if (result.success) {
          const treatments = result.data.treatment
          const categorizedTreatments = treatments.reduce((acc, treatment) => {
            const category = treatment.category.name
            if (!acc[category]) {
              acc[category] = []
            }
            acc[category].push(treatment)
            return acc
          }, {})
          setCategories(Object.entries(categorizedTreatments).map(([name, services]) => ({ name, services })))
        }
      } catch (error) {
        console.error("Error fetching treatments:", error)
      }
    }

    if (selectedLocation) {
      fetchTreatments()
    }
  }, [selectedLocation])

  const toggleTreatment = (id) => {
    setSelectedTreatments((prev) => {
      if (prev.includes(id)) {
        return prev.filter((treatmentId) => treatmentId !== id)
      }
      return [...prev, id]
    })
  }

  const handleContinue = () => {
    if (selectedTreatments.length > 0) {
      const selectedTreatmentData = categories.flatMap(category =>
        category.services.filter(service => selectedTreatments.includes(service.id))
      )
      navigate("/booking", { state: { location: selectedLocation, treatments: selectedTreatmentData } })
    }
  }

  const formatPrice = (price) => {
    return `IDR ${price.toLocaleString("id-ID")}`
  }

  return (
    <div className="min-h-screen bg-[#D9B061]">
      <div className="w-full min-h-screen md:max-w-[540px] mx-auto bg-white flex flex-col">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#D9B061] text-center pt-8 mb-6">Select Treatment</h1>

        {/* Services List */}
        <div className="flex-1 px-4 space-y-6 pb-32">
          {categories.map((category) => (
            <div key={category.name}>
              <h2 className="font-semibold text-gray-800 mb-3">{category.name}</h2>
              <div className="grid grid-cols-3 gap-3">
                {category.services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleTreatment(service.id)}
                    className={`relative p-3 rounded-xl border transition-all ${
                      selectedTreatments.includes(service.id)
                        ? "border-[#D9B061] bg-[#FDF8EF]"
                        : "border-gray-200 hover:border-[#D9B061]"
                    }`}
                  >
                    {selectedTreatments.includes(service.id) && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#D9B061] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="aspect-square bg-[#FFE8E8] rounded-full mb-2 flex items-center justify-center">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-1/2 h-1/2 object-contain"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-800">{service.name}</p>
                    <p className="text-xs text-gray-600">{formatPrice(service.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 space-y-3 bg-white md:max-w-[540px] md:mx-auto">
          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-between bg-[#D9B061] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            disabled={selectedTreatments.length === 0}
          >
            <span>{selectedTreatments.length} Treatments</span>
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

export default TreatmentPage
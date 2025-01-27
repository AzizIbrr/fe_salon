import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CustomerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { location: selectedLocation, treatments, selectedDate, selectedTime, selectedTherapists, therapists } = location.state || {}
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateIdTrans = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    return `A${year}${month}${day}${randomNum}`
  }

  const handleNext = () => {
    if (isFormValid()) {
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0]
      const idTrans = generateIdTrans()

      const bookingData = {
        idTrans,
        customer: formData.name,
        location: selectedLocation.name,
        phoneNo: formData.phoneNumber,
        treatments: treatments.map(treatment => `${treatment.name} (${treatment.category.name})`),
        therapists: Object.entries(selectedTherapists).map(([treatmentName, therapistId]) => {
          const treatment = therapists.find(t => t.treatment_name === treatmentName)
          const therapist = treatment?.therapists.find(therapist => therapist.id === therapistId)
          return therapist ? { treatmentName, therapistName: therapist.name, therapistPrice: therapist.price } : { treatmentName, therapistName: "N/A", therapistPrice: 0 }
        }),
        date: formattedDate,
        time: selectedTime,
        payments: [
          ...treatments.map(treatment => ({ name: treatment.name, amount: treatment.price })),
          ...Object.entries(selectedTherapists).map(([treatmentName, therapistId]) => {
            const treatment = therapists.find(t => t.treatment_name === treatmentName)
            const therapist = treatment?.therapists.find(therapist => therapist.id === therapistId)
            return therapist ? { name: `${treatmentName} (Therapist)`, amount: therapist.price } : { name: `${treatmentName} (Therapist)`, amount: 0 }
          })
        ],
      }

      const additionalData = {
        branch_id: selectedLocation.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        date: formattedDate,
        start_time: selectedTime,
        detail: Object.entries(selectedTherapists).map(([treatmentName, therapistId]) => {
          const treatment = treatments.find(t => t.name === treatmentName)
          return { treatment_id: treatment.id, therapist_id: therapistId }
        })
      }

      navigate("/review", { state: { ...bookingData, additionalData } })
    }
  }

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      /^\d{10,12}$/.test(formData.phoneNumber)
    )
  }

  return (
    <div className="min-h-screen bg-[#D9B061]">
      <div className="w-full min-h-screen md:max-w-[540px] mx-auto bg-white flex flex-col">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#D9B061] text-center pt-8 mb-6">Customer Information</h1>

        {/* Form Content */}
        <div className="flex-1 px-4 pb-32">
          <div className="border border-[#D9B061] rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-6">Customer Information</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Lilya Amanda"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D9B061]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="lilya@gmail.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D9B061]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="08129189232"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D9B061]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 space-y-3 bg-white md:max-w-[540px] md:mx-auto">
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center bg-[#D9B061] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            disabled={!isFormValid()}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5 ml-2" />
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

export default CustomerPage
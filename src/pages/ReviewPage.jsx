import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft } from "lucide-react"

const ReviewPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const bookingData = location.state || {}
  const additionalData = bookingData.additionalData || {}

  const handleSubmit = async () => {
    console.log("Submitting additional data:", additionalData)

    try {
      const response = await fetch("http://localhost:8000/api/save-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(additionalData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Booking submitted successfully:", result)
        alert("Booking submitted successfully")
        navigate("/") // Navigate to the main page
      } else {
        const error = await response.json()
        console.error("Failed to submit booking:", error)
        alert("Failed to submit booking")
      }
    } catch (error) {
      console.error("Error submitting booking:", error)
      alert("Error submitting booking")
    }
  }

  const formatPrice = (price) => {
    return `IDR ${price}`
  }

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en-US', options)
  }

  const totalAmount = bookingData.payments.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="min-h-screen bg-[#D9B061]">
      <div className="w-full min-h-screen md:max-w-[540px] mx-auto bg-white flex flex-col">
        {/* Header */}
        <header className="bg-[#D9B061] text-white text-center py-6">
          <h1 className="text-2xl font-bold">SALONKU</h1>
          <p className="text-xl font-bold">BOOKING ONLINE</p>
        </header>

        <div className="flex-1 px-4 py-6">
          <h2 className="text-2xl text-[#D9B061] font-bold text-center mb-4">Review</h2>

          {/* Order Details */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
            <h3 className="text-lg text-[#D9B061] font-semibold mb-4">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ID Trans</span>
                <span className="font-medium">{bookingData.idTrans}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer</span>
                <span className="font-medium">{bookingData.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-medium">{bookingData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone No</span>
                <span className="font-medium">{bookingData.phoneNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Treatments</span>
                <div className="text-right">
                  {bookingData.treatments.map((treatment, index) => (
                    <div key={index} className="font-medium">
                      {treatment}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Therapists</span>
                <div className="text-right">
                  {bookingData.therapists.map((therapist, index) => (
                    <div key={index} className="font-medium">
                      {therapist.treatmentName}: {therapist.therapistName}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <div className="text-right">
                  <div className="font-medium">{formatDate(bookingData.date)}</div>
                  <div className="font-medium">{bookingData.time}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
            <h3 className="text-lg text-[#D9B061] font-semibold mb-4">Payment Detail</h3>
            <div className="space-y-3">
              {bookingData.payments.map((payment, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{payment.name}</span>
                  <span className="font-medium">{formatPrice(payment.amount)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rp. {totalAmount.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Bottom Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-4 space-y-3 bg-white md:max-w-[540px] md:mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#D9B061] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#c49c55] transition-colors"
            >
              Submit
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
    </div>
  )
}

export default ReviewPage
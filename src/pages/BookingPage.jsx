import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const BookingPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { location: selectedLocation, treatments } = location.state || {}
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [timeSlots, setTimeSlots] = useState([])

  useEffect(() => {
    if (selectedLocation) {
      const generateTimeSlots = (start, end) => {
        const slots = []
        let current = new Date(`1970-01-01T${start}`)
        const endTime = new Date(`1970-01-01T${end}`)

        while (current <= endTime) {
          slots.push(current.toTimeString().slice(0, 5))
          current = new Date(current.getTime() + 30 * 60000) // Add 30 minutes
        }

        return slots
      }

      const slots = generateTimeSlots(selectedLocation.start_hour, selectedLocation.close_hour)
      setTimeSlots(slots)
    }
  }, [selectedLocation])

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      console.log("Selected Location:", selectedLocation)
      console.log("Selected Treatments:", treatments)
      console.log("Selected Date:", selectedDate)
      console.log("Selected Time:", selectedTime)
      navigate("/therapist", { state: { location: selectedLocation, treatments, selectedDate, selectedTime } })
    }
  }

  return (
    <div className="min-h-screen bg-[#D9B061]">
      <div className="w-full min-h-screen md:max-w-[540px] mx-auto bg-white flex flex-col">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#D9B061] text-center pt-8 mb-6">Select Date</h1>

        <div className="flex-1 px-4 pb-32">
          {/* Set Appointment Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Set Appointment</h2>
              <button className="text-[#D9B061]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            {/* Calendar Component */}
            <div className="border rounded-lg p-4 mb-6 justify-center items-center text-center">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
                className="w-full"
              />
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Slot Available</h2>
                <button className="text-[#D9B061]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-4 rounded-full text-sm border ${
                      selectedTime === time
                        ? "bg-[#D9B061] text-white border-[#D9B061]"
                        : "border-gray-200 hover:border-[#D9B061]"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 space-y-3 bg-white md:max-w-[540px] md:mx-auto">
          <button
            onClick={handleNext}
            className="w-full bg-[#D9B061] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-between"
            disabled={!selectedDate || !selectedTime}
          >
            <span>Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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

export default BookingPage
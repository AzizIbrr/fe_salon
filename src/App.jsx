import React from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import FeedCard from "./FeedCard"
import LocationPage from "./pages/LocationPage"
import TreatmentPage from "./pages/TreatmentPage"
import BookingPage from "./pages/BookingPage"
import TherapistPage from "./pages/TherapistPage"
import CustomerPage from "./pages/CustomerPage"
import ReviewPage from "./pages/ReviewPage"

const Home = () => {
  const navigate = useNavigate()

  const handleBookNow = () => {
    navigate("/location")
  }

  return (
    <div className="min-h-screen bg-[#D9B061]">
      <div className="w-full min-h-screen md:max-w-[540px] flex flex-col mx-auto bg-white">
        {/* Header */}
        <header className="text-center mt-4 sm:mt-8 px-2 py-4 sm:py-6 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#D9B061]">SALONKU</h1>
          <p className="text-xl sm:text-2xl font-bold text-[#D9B061]">BOOKING ONLINE</p>
        </header>

        <div className="bg-[#D9B061] w-full rounded-t-3xl flex-1">
          <section className="px-4 sm:px-6 pt-6 mt-2 sm:mt-4">
            <h2 className="text-2xl sm:text-3xl mb-2 text-white">
              Hello <span className="text-white font-bold">There,</span>
            </h2>
            <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6">Let's take care of your beauty</p>
            <div className="text-center">
              <button
                onClick={handleBookNow}
                className="w-full sm:w-auto bg-white text-2xl sm:text-3xl text-[#D9B061] px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold shadow-md hover:shadow-lg transition-shadow"
              >
                Book Now
              </button>
            </div>
          </section>

          {/* Feed Section */}
          <section className="mt-8 sm:mt-10 px-2 sm:px-4 w-full py-2">
            <h3 className="text-base sm:text-lg text-white font-bold mb-3 sm:mb-4 text-left pl-2">Feed for You</h3>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-6 px-2">
              <div className="snap-center shrink-0 w-[280px] sm:w-[320px]">
                <FeedCard />
              </div>
              <div className="snap-center shrink-0 w-[280px] sm:w-[320px]">
                <FeedCard />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/treatment" element={<TreatmentPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/therapist" element={<TherapistPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </Router>
  )
}

export default App


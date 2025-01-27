import React from "react"
import FeedCard from "./FeedCard"

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-[540px] flex flex-col mx-auto">
        {/* Header */}
        <header className="text-center mt-8 px-2 py-6 mb-6">
          <h1 className="text-2xl font-bold text-[#D9B061]">SALONKU</h1>
          <p className="text-2xl font-bold text-[#D9B061]">BOOKING ONLINE</p>
        </header>

        <div className="bg-[#D9B061] w-full rounded-t-3xl flex-1 px-4">
          <section className="px-6 pt-6 mt-4">
            <h2 className="text-3xl mb-2 text-white">
              Hello <span className="text-white font-bold">There,</span>
            </h2>
            <p className="text-xl text-white mb-6">Let's take care of your beauty</p>
            <div className="text-center">
              <button className="bg-white text-3xl w-50 text-[#D9B061] px-6 py-4 rounded-lg font-bold shadow-md">
                Book Now
              </button>
            </div>
          </section>

          {/* Feed Section */}
          <section className="mt-10 px-4 w-full py-2">
            <h3 className="text-lg text-white font-bold mb-4 text-left">Feed for You</h3>
            <div className="flex gap-4 overflow-x-scroll no-scrollbar pb-6">
              {/* Card 1 */}
              <FeedCard />
              {/* Card 2 */}
              <FeedCard />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
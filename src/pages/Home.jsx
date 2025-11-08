import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('Berlin');
  const [to, setTo] = useState('Paris');
  const [date, setDate] = useState('2024-12-15');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/results', { state: { from, to, date, passengers } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-check24-blue to-blue-700 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl w-full fade-in">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            ✈️ CHECK24 Flight Search
          </h1>
          <p className="text-blue-100 text-base sm:text-lg">
            AI-Powered Smart Flight Booking
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 card-hover">
          <div className="flex items-center gap-2 mb-6 text-check24-blue">
            <span className="text-xl sm:text-2xl">⚡</span>
            <h2 className="text-lg sm:text-xl font-semibold">Smart Search</h2>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-check24-blue focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                />
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-check24-blue focus:border-transparent transition-all duration-200"
                  placeholder="Enter city"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-check24-blue focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passengers
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-check24-blue focus:border-transparent transition-all duration-200"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI Info Box */}
            <div className="bg-check24-light-blue border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-lg mt-0.5">💡</span>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Smart Search Tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Best prices typically found 3-6 weeks before departure</li>
                    <li>Tuesday and Wednesday flights are often cheaper</li>
                    <li>Morning flights have better on-time records</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-check24-blue text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 transition-all duration-300 shadow-lg btn-hover-lift"
            >
              🔍 Search Flights
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-blue-100 text-sm">
          Powered by AI SmartRank Technology
        </div>
      </div>
    </div>
  );
};

export default Home;

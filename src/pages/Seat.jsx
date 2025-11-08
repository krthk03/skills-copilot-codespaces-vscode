import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Seat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, from, to, date, passengers, traveler, baggage, insurance } =
    location.state || {};

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  // Generate seat map (6 rows x 4 columns)
  const seatMap = Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 4 }, (_, col) => ({
      id: `${row + 1}${String.fromCharCode(65 + col)}`,
      row: row + 1,
      col: col + 1,
      available: Math.random() > 0.3, // 70% available
      price: row >= 5 && row <= 9 ? 15 : 20, // rows 6-10 are cheaper
      recommended: row >= 5 && row <= 9,
    }))
  );

  const handleSeatSelect = (seat) => {
    if (seat.available) {
      setSelectedSeat(seat);
    }
  };

  const handleContinue = () => {
    navigate('/checkout', {
      state: {
        flight,
        from,
        to,
        date,
        passengers,
        traveler,
        baggage,
        insurance,
        seat: selectedSeat,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-check24-blue text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Select Your Seat</h1>
          <p className="text-blue-100 mt-1">
            {flight?.airline} • {from} → {to}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* AI Recommendation Banner */}
        <div className="bg-check24-light-blue border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-xl">⚡</span>
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">AI Seat Recommender:</p>
              <p>
                Rows 6–10 offer the best comfort-to-price ratio. These seats are highlighted in
                blue below.
              </p>
            </div>
          </div>
        </div>

        {/* Seat Map Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Cabin Layout</h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-4 py-2 text-check24-blue border border-check24-blue rounded-lg hover:bg-check24-light-blue transition-colors text-sm font-medium"
            >
              {showComparison ? 'Hide' : 'Compare'} AI Seat Ratings
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded border-2 border-blue-700"></div>
              <span>AI Recommended</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-check24-blue rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <span>Occupied</span>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="flex justify-center">
            <div className="inline-block">
              {/* Column Labels (A B C D) */}
              <div className="flex mb-2">
                <div className="w-12"></div>
                {['A', 'B', 'C', 'D'].map((letter) => (
                  <div key={letter} className="w-12 text-center text-sm font-medium text-gray-500">
                    {letter}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {seatMap.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center mb-2">
                  {/* Row number */}
                  <div className="w-12 text-center text-sm font-medium text-gray-500">
                    {rowIndex + 1}
                  </div>

                  {/* Seats */}
                  {row.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatSelect(seat)}
                      disabled={!seat.available}
                      className={`w-10 h-10 mx-1 rounded text-xs font-medium transition-all ${
                        selectedSeat?.id === seat.id
                          ? 'bg-check24-blue text-white scale-110'
                          : seat.recommended && seat.available
                          ? 'bg-blue-500 text-white border-2 border-blue-700 hover:scale-105'
                          : seat.available
                          ? 'bg-green-500 text-white hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      title={
                        seat.available
                          ? `${seat.id} - €${seat.price}${seat.recommended ? ' (AI Recommended)' : ''}`
                          : `${seat.id} - Occupied`
                      }
                    >
                      {seat.id}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Seat Info */}
          {selectedSeat && (
            <div className="mt-6 p-4 bg-check24-light-blue border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-check24-blue">Selected: Seat {selectedSeat.id}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    {selectedSeat.recommended && '⚡ AI Recommended • '}
                    Row {selectedSeat.row}
                  </p>
                </div>
                <p className="text-2xl font-bold text-check24-blue">€{selectedSeat.price}</p>
              </div>
            </div>
          )}

          {/* AI Comparison Table */}
          {showComparison && (
            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">AI Seat Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Row Range</th>
                      <th className="px-4 py-2 text-left">Comfort</th>
                      <th className="px-4 py-2 text-left">Noise Level</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3">1-5</td>
                      <td className="px-4 py-3">Good</td>
                      <td className="px-4 py-3">Low</td>
                      <td className="px-4 py-3">€20</td>
                      <td className="px-4 py-3">⭐⭐⭐⭐</td>
                    </tr>
                    <tr className="bg-check24-light-blue">
                      <td className="px-4 py-3 font-semibold">6-10 ⚡</td>
                      <td className="px-4 py-3">Excellent</td>
                      <td className="px-4 py-3">Very Low</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">€15</td>
                      <td className="px-4 py-3">⭐⭐⭐⭐⭐</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">11-12</td>
                      <td className="px-4 py-3">Fair</td>
                      <td className="px-4 py-3">Medium</td>
                      <td className="px-4 py-3">€20</td>
                      <td className="px-4 py-3">⭐⭐⭐</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedSeat}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-opacity ${
              selectedSeat
                ? 'bg-check24-blue text-white hover:opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seat;

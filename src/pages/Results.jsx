import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AIBadge from '../components/AIBadge';
import { mockFlights, aiInsights } from '../mockData';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, date, passengers } = location.state || {
    from: 'Berlin',
    to: 'Paris',
    date: '2024-12-15',
    passengers: 1,
  };

  const [activeTab, setActiveTab] = useState('smartrank');
  const [showInsights, setShowInsights] = useState(false);
  const [flights, setFlights] = useState(mockFlights);

  const sortFlights = (type) => {
    let sorted = [...mockFlights];
    switch (type) {
      case 'cheapest':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'fastest':
        sorted.sort((a, b) => {
          const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split(' ')[1]);
          const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split(' ')[1]);
          return durationA - durationB;
        });
        break;
      case 'smartrank':
        sorted.sort((a, b) => b.score - a.score);
        break;
      default:
        break;
    }
    setFlights(sorted);
    setActiveTab(type);
  };

  const handleBookFlight = (flight) => {
    navigate('/traveler', { state: { flight, from, to, date, passengers } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-check24-blue text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Flight Results</h1>
              <p className="text-blue-100">
                {from} → {to} • {date} • {passengers} passenger{passengers > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-white text-check24-blue rounded-lg hover:bg-blue-50 transition-colors"
            >
              ← Back to Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-2 flex gap-2">
          <button
            onClick={() => sortFlights('cheapest')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'cheapest'
                ? 'bg-check24-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            💰 Cheapest
          </button>
          <button
            onClick={() => sortFlights('fastest')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'fastest'
                ? 'bg-check24-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            ⚡ Fastest
          </button>
          <button
            onClick={() => sortFlights('smartrank')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors relative ${
              activeTab === 'smartrank'
                ? 'bg-check24-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>⚡ SmartRank</span>
              <span className="text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>
          </button>
        </div>

        {/* SmartRank Info */}
        {activeTab === 'smartrank' && (
          <div className="bg-check24-light-blue border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-check24-blue">
              <span className="text-xl">💡</span>
              <p className="text-sm">
                <strong>AI SmartRank:</strong> Intelligently balances cost, flight time, and
                historical reliability to find your best option.
              </p>
            </div>
          </div>
        )}

        {/* Flight Cards */}
        <div className="space-y-4">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  {/* Airline */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{flight.logo}</div>
                    <p className="text-sm font-medium text-gray-700">{flight.airline}</p>
                  </div>

                  {/* Times */}
                  <div className="flex items-center gap-4 flex-1">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{flight.departure}</p>
                      <p className="text-sm text-gray-500">{from}</p>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="h-px bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                          <span className="text-xs text-gray-500">{flight.duration}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Direct</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{flight.arrival}</p>
                      <p className="text-sm text-gray-500">{to}</p>
                    </div>
                  </div>
                </div>

                {/* Price and Book */}
                <div className="text-right ml-6">
                  <div className="mb-3">
                    <p className="text-3xl font-bold text-check24-blue">€{flight.price}</p>
                    <AIBadge text={`Verified ${flight.verified}`} className="mt-1" />
                  </div>
                  <button
                    onClick={() => handleBookFlight(flight)}
                    className="w-full px-6 py-3 bg-check24-blue text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Book →
                  </button>
                  {activeTab === 'smartrank' && (
                    <div className="mt-2 text-xs text-gray-500">
                      SmartScore: {flight.score}/100
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating AI Insights Button */}
        <button
          onClick={() => setShowInsights(!showInsights)}
          className="fixed bottom-8 right-8 bg-check24-blue text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <span>⚡</span>
          <span>Show AI Insights</span>
        </button>

        {/* AI Insights Drawer */}
        {showInsights && (
          <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl p-6 overflow-y-auto z-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-check24-blue">AI Insights</h2>
              <button
                onClick={() => setShowInsights(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-check24-light-blue rounded-lg p-4">
                <h3 className="font-semibold text-check24-blue mb-3 flex items-center gap-2">
                  <span>📊</span>
                  <span>AI Fare Summary</span>
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    • <strong>Best price window:</strong> {aiInsights.bestPriceWindow}
                  </p>
                  <p>
                    • <strong>Average price:</strong> €{aiInsights.avgPrice}
                  </p>
                  <p>
                    • <strong>On-time rate:</strong> {aiInsights.onTimeRate}%
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  <span>Smart Recommendations</span>
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>✅ Morning flights have 98% on-time rate</p>
                  <p>✅ Direct flights save 2+ hours</p>
                  <p>✅ Book now - prices rising 5% weekly</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backdrop */}
        {showInsights && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowInsights(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Results;

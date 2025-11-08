import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { insurancePlans } from '../mockData';

const Extras = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, from, to, date, passengers, traveler } = location.state || {};

  const [baggage, setBaggage] = useState('hand-luggage');
  const [selectedInsurance, setSelectedInsurance] = useState(2); // AI recommended plan

  const baggageOptions = [
    { value: 'hand-luggage', label: 'Hand luggage only', price: 0 },
    { value: '1-checked', label: '1 checked bag (23kg)', price: 25 },
    { value: '2-checked', label: '2 checked bags (23kg each)', price: 45 },
  ];

  const handleContinue = () => {
    const selectedBaggage = baggageOptions.find((b) => b.value === baggage);
    const selectedInsurancePlan = insurancePlans.find((p) => p.id === selectedInsurance);

    navigate('/seat', {
      state: {
        flight,
        from,
        to,
        date,
        passengers,
        traveler,
        baggage: selectedBaggage,
        insurance: selectedInsurancePlan,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-check24-blue text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Extras & Add-ons</h1>
          <p className="text-blue-100 mt-1">
            {flight?.airline} • {from} → {to}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Baggage Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Baggage Options</h2>

          <div className="space-y-3 mb-4">
            {baggageOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  baggage === option.value
                    ? 'border-check24-blue bg-check24-light-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="baggage"
                    value={option.value}
                    checked={baggage === option.value}
                    onChange={(e) => setBaggage(e.target.value)}
                    className="w-5 h-5 text-check24-blue focus:ring-check24-blue"
                  />
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
                <span className="font-semibold text-check24-blue">
                  {option.price === 0 ? 'Included' : `+€${option.price}`}
                </span>
              </label>
            ))}
          </div>

          {/* AI Tip */}
          <div className="bg-check24-light-blue border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-lg">⚡</span>
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">AI Tip:</p>
                <p>Most 5–7 day travelers select 1 checked bag (23kg).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Travel Insurance</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {insurancePlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedInsurance(plan.id)}
                className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedInsurance === plan.id
                    ? 'border-check24-blue bg-check24-light-blue shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      ⚡ AI Recommended
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-check24-blue">€{plan.price}</p>
                  <p className="text-xs text-gray-500 mt-1">per person</p>
                </div>

                <ul className="space-y-2 text-sm text-gray-700">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {selectedInsurance === plan.id && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex items-center justify-center gap-2 text-check24-blue font-semibold text-sm">
                      <span>✓</span>
                      <span>Selected</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AI Recommendation Explanation */}
          {selectedInsurance === 2 && (
            <div className="bg-check24-light-blue border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-lg">💡</span>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Why All-round Care?</p>
                  <p>
                    Selected using trip length and coverage analysis. Provides optimal protection
                    for your journey at the best value.
                  </p>
                </div>
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
            className="flex-1 px-6 py-3 bg-check24-blue text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Continue to Seating →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Extras;

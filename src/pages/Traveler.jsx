import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InfoBanner from '../components/InfoBanner';
import { mockTraveler } from '../mockData';

const Traveler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, from, to, date, passengers } = location.state || {};

  const [showAutofill, setShowAutofill] = useState(true);
  const [saveForFuture, setSaveForFuture] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
  });

  const handleAutofill = () => {
    setFormData(mockTraveler);
    setShowAutofill(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/extras', { state: { flight, from, to, date, passengers, traveler: formData } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-check24-blue text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Traveler Information</h1>
          <p className="text-blue-100 mt-1">
            {flight?.airline} • {from} → {to}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Smart Autofill Banner */}
        {showAutofill && (
          <InfoBanner
            title="⚡ Smart Autofill: Found saved traveler info — auto-fill?"
            actionText="Auto-Fill"
            onAction={handleAutofill}
            onDismiss={() => setShowAutofill(false)}
            type="ai"
          />
        )}

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Enter Passenger Details
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-check24-blue focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-check24-blue focus:border-transparent"
                  placeholder="john.smith@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-check24-blue focus:border-transparent"
                  placeholder="+49 123 456 7890"
                />
              </div>

              {/* Birthdate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-check24-blue focus:border-transparent"
                />
              </div>

              {/* Save for future checkbox */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <input
                  type="checkbox"
                  id="saveForFuture"
                  checked={saveForFuture}
                  onChange={(e) => setSaveForFuture(e.target.checked)}
                  className="w-5 h-5 text-check24-blue border-gray-300 rounded focus:ring-check24-blue"
                />
                <label htmlFor="saveForFuture" className="text-sm text-gray-700 cursor-pointer">
                  Save for future AI Autofill
                </label>
              </div>
            </div>

            {/* AI Info */}
            <div className="mt-6 bg-check24-light-blue border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-lg">🔒</span>
                <div>
                  <p className="font-semibold mb-1">Secure & Private</p>
                  <p>
                    Your data is encrypted and never shared. Smart Autofill uses secure local
                    storage to help you book faster next time.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-check24-blue text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Continue to Extras →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Traveler;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SmartSummaryBox from '../components/SmartSummaryBox';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, from, to, date, passengers, traveler, baggage, insurance, seat } =
    location.state || {};

  const [enableAlerts, setEnableAlerts] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate total
  const flightPrice = flight?.price || 0;
  const baggagePrice = baggage?.price || 0;
  const insurancePrice = insurance?.price || 0;
  const seatPrice = seat?.price || 0;
  const total = flightPrice + baggagePrice + insurancePrice + seatPrice;

  const handleBooking = () => {
    setShowSuccess(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Complete!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your flight from {from} to {to} is confirmed.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Booking Details:</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Flight:</strong> {flight?.airline} • {flight?.departure} - {flight?.arrival}
              </p>
              <p>
                <strong>Date:</strong> {date}
              </p>
              <p>
                <strong>Passenger:</strong> {traveler?.name}
              </p>
              <p>
                <strong>Seat:</strong> {seat?.id}
              </p>
              <p>
                <strong>Total Paid:</strong> €{total}
              </p>
            </div>
          </div>

          {enableAlerts && (
            <div className="bg-check24-light-blue border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-check24-blue">
                <span className="text-xl">⚡</span>
                <p className="text-sm font-medium">
                  Smart Alerts enabled! We'll notify you of any flight changes or updates.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-check24-blue text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Book Another Flight
            </button>
            <button
              onClick={() => window.print()}
              className="w-full px-6 py-3 border border-check24-blue text-check24-blue rounded-lg font-semibold hover:bg-check24-light-blue transition-colors"
            >
              📄 Download Confirmation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-check24-blue text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Review & Payment</h1>
          <p className="text-blue-100 mt-1">
            {flight?.airline} • {from} → {to}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Order Summary */}
          <div className="md:col-span-2 space-y-6">
            {/* Flight Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Flight Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{flight?.airline}</p>
                    <p className="text-sm text-gray-600">
                      {from} ({flight?.departure}) → {to} ({flight?.arrival})
                    </p>
                    <p className="text-sm text-gray-600">
                      {date} • {flight?.duration} • Direct
                    </p>
                  </div>
                  <p className="text-xl font-bold text-check24-blue">€{flightPrice}</p>
                </div>
              </div>
            </div>

            {/* Traveler Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Traveler Information</h2>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>Name:</strong> {traveler?.name}
                </p>
                <p>
                  <strong>Email:</strong> {traveler?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {traveler?.phone}
                </p>
                <p>
                  <strong>Birth Date:</strong> {traveler?.birthdate}
                </p>
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add-ons</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    {baggage?.label || 'Hand luggage only'}
                  </span>
                  <span className="font-medium text-gray-900">
                    {baggagePrice === 0 ? 'Included' : `€${baggagePrice}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">{insurance?.name} Insurance</span>
                  <span className="font-medium text-gray-900">€{insurancePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Seat {seat?.id}</span>
                  <span className="font-medium text-gray-900">€{seatPrice}</span>
                </div>
              </div>
            </div>

            {/* AI Review Summary */}
            <SmartSummaryBox
              title="Smart Review Summary"
              items={[
                { icon: '✅', text: `Best verified fare (updated ${flight?.verified})` },
                { icon: '✅', text: 'Direct flight (no layovers)' },
                { icon: '⚠️', text: 'Limited refund flexibility' },
              ]}
              confidence={94}
            />

            {/* Smart Alerts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Enable Smart Alerts</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get AI-powered notifications about flight changes, gate updates, and delays
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEnableAlerts(true)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    enableAlerts
                      ? 'bg-check24-blue text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Enable
                </button>
                <button
                  onClick={() => setEnableAlerts(false)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    !enableAlerts
                      ? 'bg-gray-200 text-gray-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  No thanks
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h2>

              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Flight</span>
                  <span className="font-medium text-gray-900">€{flightPrice}</span>
                </div>
                {baggagePrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Baggage</span>
                    <span className="font-medium text-gray-900">€{baggagePrice}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-medium text-gray-900">€{insurancePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seat</span>
                  <span className="font-medium text-gray-900">€{seatPrice}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-check24-blue">€{total}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-check24-blue text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Book Now
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                🔒 Secure payment • No hidden fees
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            ← Back to Seat Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

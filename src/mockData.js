export const mockFlights = [
  {
    id: 1,
    airline: 'Lufthansa',
    logo: '✈️',
    departure: '07:00',
    arrival: '09:30',
    duration: '2h 30m',
    price: 89,
    score: 95,
    reliability: 98,
    verified: '3 min ago',
  },
  {
    id: 2,
    airline: 'Air France',
    logo: '🛫',
    departure: '08:15',
    arrival: '10:50',
    duration: '2h 35m',
    price: 95,
    score: 92,
    reliability: 95,
    verified: '5 min ago',
  },
  {
    id: 3,
    airline: 'British Airways',
    logo: '✈️',
    departure: '10:00',
    arrival: '12:25',
    duration: '2h 25m',
    price: 78,
    score: 88,
    reliability: 92,
    verified: '2 min ago',
  },
  {
    id: 4,
    airline: 'KLM',
    logo: '🛫',
    departure: '12:30',
    arrival: '15:10',
    duration: '2h 40m',
    price: 105,
    score: 85,
    reliability: 96,
    verified: '1 min ago',
  },
  {
    id: 5,
    airline: 'Ryanair',
    logo: '✈️',
    departure: '14:45',
    arrival: '17:15',
    duration: '2h 30m',
    price: 65,
    score: 80,
    reliability: 88,
    verified: '4 min ago',
  },
  {
    id: 6,
    airline: 'easyJet',
    logo: '🛫',
    departure: '18:00',
    arrival: '20:35',
    duration: '2h 35m',
    price: 72,
    score: 82,
    reliability: 90,
    verified: '6 min ago',
  },
];

export const mockTraveler = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+49 123 456 7890',
  birthdate: '1990-05-15',
};

export const insurancePlans = [
  {
    id: 1,
    name: 'Trip Cancellation',
    price: 12,
    recommended: false,
    features: ['Cancel up to 24h before', 'Refund up to €500'],
  },
  {
    id: 2,
    name: 'All-round Care',
    price: 26,
    recommended: true,
    features: ['Cancel anytime', 'Medical coverage', 'Baggage protection'],
  },
  {
    id: 3,
    name: 'Annual',
    price: 53,
    recommended: false,
    features: ['Multiple trips', 'Full coverage', 'Priority support'],
  },
];

export const aiInsights = {
  bestPriceWindow: '7:00–9:00 AM',
  avgPrice: 116,
  onTimeRate: 95,
};

export const seatMap = Array.from({ length: 6 }, (_, row) =>
  Array.from({ length: 4 }, (_, col) => ({
    id: `${row + 1}${String.fromCharCode(65 + col)}`,
    row: row + 1,
    col: col + 1,
    available: true,
    price: row >= 5 && row <= 9 ? 15 : 20,
  }))
);

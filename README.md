# Check24 Flight Module

A comprehensive flight search and comparison module inspired by Check24, allowing users to search, filter, and compare flights efficiently.

## Features

- 🔍 **Flight Search**: Search flights by departure and arrival cities
- 💰 **Price Filtering**: Find flights within your budget
- ✈️  **Airline Filtering**: Filter by specific airlines
- ⚡ **Smart Sorting**: Get cheapest or fastest flights
- 📊 **Flight Comparison**: Compare multiple flights side-by-side
- 🌍 **Multi-destination Support**: Search across various global routes

## Installation

```bash
npm install
```

## Usage

### Basic Usage

```javascript
const { Check24FlightModule } = require('./src/index');

// Create a new flight module instance
const flightModule = new Check24FlightModule();

// Search for flights
flightModule.search('Frankfurt', 'New York');

// Get cheapest flights
flightModule.getCheapestFlights(5);

// Get fastest flights
flightModule.getFastestFlights(5);
```

### Advanced Usage

```javascript
const { Check24FlightModule } = require('./src/index');
const flightModule = new Check24FlightModule();

// Filter by price
const affordableFlights = flightModule.filterByPrice(200);

// Get available airlines
const airlines = flightModule.getAirlines();

// Compare specific flights
const comparison = flightModule.compareFlights([1, 2, 3]);
```

## Running the Demo

To see the module in action:

```bash
npm start
```

## Running Tests

To run the test suite:

```bash
npm test
```

## API Reference

### Check24FlightModule

Main class providing the flight search interface.

#### Methods

- `search(departureCity, arrivalCity)` - Search flights between two cities
- `getCheapestFlights(limit)` - Get the cheapest flights (default: 5)
- `getFastestFlights(limit)` - Get the fastest flights (default: 5)
- `filterByPrice(maxPrice)` - Filter flights by maximum price
- `getAirlines()` - Get list of all available airlines
- `compareFlights(flightIds)` - Compare specific flights by their IDs
- `demo()` - Run a complete demonstration of the module

### FlightSearchEngine

Core search engine class with advanced filtering capabilities.

#### Methods

- `searchFlights(departureCity, arrivalCity)` - Search by cities
- `filterByPrice(maxPrice)` - Filter by price
- `filterByAirline(airlineName)` - Filter by airline
- `getCheapestFlights(limit)` - Get cheapest flights
- `getFastestFlights(limit)` - Get fastest flights
- `getAvailableAirlines()` - Get all airlines
- `getAllFlights()` - Get all available flights
- `compareFlights(flightIds)` - Compare flights

## Data Models

### Flight

```javascript
{
  id: Number,
  airline: String,
  flightNumber: String,
  departure: Airport,
  arrival: Airport,
  price: Number,
  duration: String,
  stops: Number
}
```

### Airport

```javascript
{
  code: String,
  city: String,
  country: String
}
```

## Example Output

```
═══════════════════════════════════════════════════════
     Check24 Flight Module - Demo
═══════════════════════════════════════════════════════

🔍 Searching flights from Frankfurt to New York...

  1. Lufthansa LH400
     Route: FRA (Frankfurt) → JFK (New York)
     Duration: 8h 30m | Stops: 0
     Price: €450

💰 Top 3 Cheapest Flights:

  4. Ryanair FR2156
     Route: BER (Berlin) → BCN (Barcelona)
     Duration: 2h 30m | Stops: 0
     Price: €89
```

## Project Structure

```
skills-copilot-codespaces-vscode/
├── src/
│   ├── index.js          # Main module entry point
│   ├── FlightSearch.js   # Search engine implementation
│   ├── FlightData.js     # Data models and sample data
│   └── test.js           # Test suite
├── package.json          # Project configuration
└── README.md            # This file
```

## Future Enhancements

- Add real-time API integration
- Support for multi-leg flights
- Date-based flight search
- Booking functionality
- User preferences and saved searches
- Price alerts and notifications
- Integration with payment systems

## License

ISC

## Author

Created as part of the skills-copilot-codespaces-vscode repository.

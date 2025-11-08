/**
 * FlightSearch.js
 * Flight search and comparison functionality for Check24
 */

const { sampleFlights } = require('./FlightData');

class FlightSearchEngine {
  constructor(flights = sampleFlights) {
    this.flights = flights;
  }

  /**
   * Search flights by departure and arrival cities
   */
  searchFlights(departureCity, arrivalCity) {
    return this.flights.filter(
      flight =>
        flight.departure.city.toLowerCase().includes(departureCity.toLowerCase()) &&
        flight.arrival.city.toLowerCase().includes(arrivalCity.toLowerCase())
    );
  }

  /**
   * Filter flights by maximum price
   */
  filterByPrice(maxPrice) {
    return this.flights.filter(flight => flight.price <= maxPrice);
  }

  /**
   * Filter flights by airline
   */
  filterByAirline(airlineName) {
    return this.flights.filter(
      flight => flight.airline.toLowerCase().includes(airlineName.toLowerCase())
    );
  }

  /**
   * Get cheapest flights
   */
  getCheapestFlights(limit = 5) {
    return [...this.flights]
      .sort((a, b) => a.price - b.price)
      .slice(0, limit);
  }

  /**
   * Get fastest flights (by duration)
   */
  getFastestFlights(limit = 5) {
    return [...this.flights]
      .sort((a, b) => {
        const aDuration = this.parseDuration(a.duration);
        const bDuration = this.parseDuration(b.duration);
        return aDuration - bDuration;
      })
      .slice(0, limit);
  }

  /**
   * Parse duration string to minutes
   */
  parseDuration(duration) {
    const parts = duration.match(/(\d+)h (\d+)m/);
    if (!parts) return 0;
    return parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10);
  }

  /**
   * Get all available airlines
   */
  getAvailableAirlines() {
    return [...new Set(this.flights.map(flight => flight.airline))];
  }

  /**
   * Get all flights
   */
  getAllFlights() {
    return this.flights;
  }

  /**
   * Compare flights side by side
   */
  compareFlights(flightIds) {
    return this.flights.filter(flight => flightIds.includes(flight.id));
  }
}

module.exports = FlightSearchEngine;

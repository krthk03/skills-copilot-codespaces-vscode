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
    const departureLower = departureCity.toLowerCase();
    const arrivalLower = arrivalCity.toLowerCase();
    return this.flights.filter(
      flight =>
        flight.departure.city.toLowerCase().includes(departureLower) &&
        flight.arrival.city.toLowerCase().includes(arrivalLower)
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
    const airlineNameLower = airlineName.toLowerCase();
    return this.flights.filter(
      flight => flight.airline.toLowerCase().includes(airlineNameLower)
    );
  }

  /**
   * Get cheapest flights
   */
  getCheapestFlights(limit = 5) {
    // Use slice to avoid mutating original array, then sort in-place
    return this.flights
      .slice()
      .sort((a, b) => a.price - b.price)
      .slice(0, limit);
  }

  /**
   * Get fastest flights (by duration)
   */
  getFastestFlights(limit = 5) {
    // Cache duration calculations for performance
    const flightsWithDuration = this.flights.map(flight => ({
      flight,
      duration: this.parseDuration(flight.duration)
    }));
    
    return flightsWithDuration
      .sort((a, b) => a.duration - b.duration)
      .slice(0, limit)
      .map(item => item.flight);
  }

  /**
   * Parse duration string to minutes
   */
  parseDuration(duration) {
    // Use a more secure parsing approach without regex
    const hourIndex = duration.indexOf('h');
    const minIndex = duration.indexOf('m');
    
    if (hourIndex === -1 || minIndex === -1) return 0;
    
    const hours = parseInt(duration.substring(0, hourIndex), 10);
    const minutes = parseInt(duration.substring(hourIndex + 1, minIndex).trim(), 10);
    
    if (isNaN(hours) || isNaN(minutes)) return 0;
    
    return hours * 60 + minutes;
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

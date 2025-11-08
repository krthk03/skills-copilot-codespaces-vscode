/**
 * index.js
 * Main entry point for the Check24 Flight Module
 */

const FlightSearchEngine = require('./FlightSearch');
const { Flight, Airport, sampleFlights } = require('./FlightData');

class Check24FlightModule {
  constructor() {
    this.searchEngine = new FlightSearchEngine();
  }

  /**
   * Search for flights
   */
  search(departureCity, arrivalCity) {
    console.log(`\n🔍 Searching flights from ${departureCity} to ${arrivalCity}...\n`);
    const results = this.searchEngine.searchFlights(departureCity, arrivalCity);
    this.displayResults(results);
    return results;
  }

  /**
   * Get cheapest flights
   */
  getCheapestFlights(limit = 5) {
    console.log(`\n💰 Top ${limit} Cheapest Flights:\n`);
    const results = this.searchEngine.getCheapestFlights(limit);
    this.displayResults(results);
    return results;
  }

  /**
   * Get fastest flights
   */
  getFastestFlights(limit = 5) {
    console.log(`\n⚡ Top ${limit} Fastest Flights:\n`);
    const results = this.searchEngine.getFastestFlights(limit);
    this.displayResults(results);
    return results;
  }

  /**
   * Filter by price
   */
  filterByPrice(maxPrice) {
    console.log(`\n💵 Flights under €${maxPrice}:\n`);
    const results = this.searchEngine.filterByPrice(maxPrice);
    this.displayResults(results);
    return results;
  }

  /**
   * Get available airlines
   */
  getAirlines() {
    console.log('\n✈️  Available Airlines:\n');
    const airlines = this.searchEngine.getAvailableAirlines();
    airlines.forEach(airline => console.log(`  - ${airline}`));
    return airlines;
  }

  /**
   * Compare specific flights
   */
  compareFlights(flightIds) {
    console.log('\n📊 Flight Comparison:\n');
    const results = this.searchEngine.compareFlights(flightIds);
    this.displayResults(results);
    return results;
  }

  /**
   * Display flight results in a formatted way
   */
  displayResults(flights) {
    if (flights.length === 0) {
      console.log('  No flights found matching your criteria.\n');
      return;
    }

    flights.forEach(flight => {
      console.log(`  ${flight.id}. ${flight.airline} ${flight.flightNumber}`);
      console.log(`     Route: ${flight.departure.code} (${flight.departure.city}) → ${flight.arrival.code} (${flight.arrival.city})`);
      console.log(`     Duration: ${flight.duration} | Stops: ${flight.stops}`);
      console.log(`     Price: €${flight.price}`);
      console.log('');
    });
  }

  /**
   * Demo function to showcase the module
   */
  demo() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('     Check24 Flight Module - Demo');
    console.log('═══════════════════════════════════════════════════════');

    // Search for flights
    this.search('Frankfurt', 'New York');

    // Get cheapest flights
    this.getCheapestFlights(3);

    // Get fastest flights
    this.getFastestFlights(3);

    // Filter by price
    this.filterByPrice(150);

    // Show available airlines
    this.getAirlines();

    // Compare specific flights
    this.compareFlights([1, 2, 3]);

    console.log('═══════════════════════════════════════════════════════');
    console.log('     Demo Complete!');
    console.log('═══════════════════════════════════════════════════════\n');
  }
}

// Export the module
module.exports = { Check24FlightModule, Flight, Airport, FlightSearchEngine };

// Run demo if executed directly
if (require.main === module) {
  const flightModule = new Check24FlightModule();
  flightModule.demo();
}

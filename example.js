/**
 * example.js
 * Example usage of the Check24 Flight Module
 */

const { Check24FlightModule } = require('./src/index');

console.log('\n╔════════════════════════════════════════════════════╗');
console.log('║  Check24 Flight Module - Example Usage           ║');
console.log('╚════════════════════════════════════════════════════╝\n');

// Initialize the flight module
const flightModule = new Check24FlightModule();

// Example 1: Search for specific route
console.log('Example 1: Search for flights from Frankfurt to New York');
console.log('-'.repeat(54));
flightModule.search('Frankfurt', 'New York');

// Example 2: Find budget-friendly flights
console.log('\nExample 2: Find flights under €150');
console.log('-'.repeat(54));
flightModule.filterByPrice(150);

// Example 3: Get top 3 cheapest flights
console.log('\nExample 3: Get top 3 cheapest flights');
console.log('-'.repeat(54));
flightModule.getCheapestFlights(3);

// Example 4: Get fastest flights
console.log('\nExample 4: Get top 3 fastest flights');
console.log('-'.repeat(54));
flightModule.getFastestFlights(3);

// Example 5: Search for flights to a specific destination
console.log('\nExample 5: All flights to London');
console.log('-'.repeat(54));
flightModule.search('', 'London');

// Example 6: View available airlines
console.log('\nExample 6: Available airlines');
console.log('-'.repeat(54));
flightModule.getAirlines();

// Example 7: Compare specific flights
console.log('\nExample 7: Compare flights 1, 2, and 3');
console.log('-'.repeat(54));
flightModule.compareFlights([1, 2, 3]);

console.log('\n╔════════════════════════════════════════════════════╗');
console.log('║  End of Examples                                  ║');
console.log('╚════════════════════════════════════════════════════╝\n');

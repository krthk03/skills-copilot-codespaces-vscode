/**
 * test.js
 * Simple test suite for the Check24 Flight Module
 */

const { Check24FlightModule } = require('./index');

class TestRunner {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.tests = [];
  }

  test(description, testFn) {
    this.tests.push({ description, testFn });
  }

  async run() {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║  Check24 Flight Module - Test Suite              ║');
    console.log('╚════════════════════════════════════════════════════╝\n');

    for (const { description, testFn } of this.tests) {
      try {
        await testFn();
        this.passed++;
        console.log(`✅ PASS: ${description}`);
      } catch (error) {
        this.failed++;
        console.log(`❌ FAIL: ${description}`);
        console.log(`   Error: ${error.message}`);
      }
    }

    console.log('\n' + '─'.repeat(54));
    console.log(`Results: ${this.passed} passed, ${this.failed} failed`);
    console.log('─'.repeat(54) + '\n');

    return this.failed === 0;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected} but got ${actual}`);
  }
}

// Create test suite
const runner = new TestRunner();
const flightModule = new Check24FlightModule();

// Test 1: Module initialization
runner.test('Module should initialize correctly', () => {
  assert(flightModule !== null, 'Module should not be null');
  assert(flightModule.searchEngine !== null, 'Search engine should not be null');
});

// Test 2: Search functionality
runner.test('Search should find flights from Frankfurt to New York', () => {
  const results = flightModule.searchEngine.searchFlights('Frankfurt', 'New York');
  assert(results.length > 0, 'Should find at least one flight');
  assert(results[0].departure.city === 'Frankfurt', 'Departure city should match');
  assert(results[0].arrival.city === 'New York', 'Arrival city should match');
});

// Test 3: Cheapest flights
runner.test('getCheapestFlights should return flights sorted by price', () => {
  const results = flightModule.searchEngine.getCheapestFlights(3);
  assert(results.length <= 3, 'Should return at most 3 flights');
  for (let i = 1; i < results.length; i++) {
    assert(
      results[i].price >= results[i - 1].price,
      'Flights should be sorted by price'
    );
  }
});

// Test 4: Price filter
runner.test('filterByPrice should only return flights under the max price', () => {
  const maxPrice = 200;
  const results = flightModule.searchEngine.filterByPrice(maxPrice);
  results.forEach(flight => {
    assert(
      flight.price <= maxPrice,
      `Flight price ${flight.price} should be <= ${maxPrice}`
    );
  });
});

// Test 5: Airline filter
runner.test('filterByAirline should only return flights from the specified airline', () => {
  const results = flightModule.searchEngine.filterByAirline('Lufthansa');
  assert(results.length > 0, 'Should find at least one Lufthansa flight');
  results.forEach(flight => {
    assert(
      flight.airline.toLowerCase().includes('lufthansa'),
      'Flight should be from Lufthansa'
    );
  });
});

// Test 6: Available airlines
runner.test('getAvailableAirlines should return unique airline list', () => {
  const airlines = flightModule.searchEngine.getAvailableAirlines();
  assert(airlines.length > 0, 'Should have at least one airline');
  const uniqueAirlines = new Set(airlines);
  assertEqual(airlines.length, uniqueAirlines.size, 'All airlines should be unique');
});

// Test 7: Compare flights
runner.test('compareFlights should return only requested flights', () => {
  const flightIds = [1, 2, 3];
  const results = flightModule.searchEngine.compareFlights(flightIds);
  assertEqual(results.length, 3, 'Should return exactly 3 flights');
  results.forEach(flight => {
    assert(flightIds.includes(flight.id), 'Flight ID should be in the requested list');
  });
});

// Test 8: Get all flights
runner.test('getAllFlights should return all available flights', () => {
  const results = flightModule.searchEngine.getAllFlights();
  assert(results.length > 0, 'Should return at least one flight');
});

// Test 9: Fastest flights
runner.test('getFastestFlights should return flights sorted by duration', () => {
  const results = flightModule.searchEngine.getFastestFlights(3);
  assert(results.length <= 3, 'Should return at most 3 flights');
  for (let i = 1; i < results.length; i++) {
    const prevDuration = flightModule.searchEngine.parseDuration(results[i - 1].duration);
    const currDuration = flightModule.searchEngine.parseDuration(results[i].duration);
    assert(
      currDuration >= prevDuration,
      'Flights should be sorted by duration'
    );
  }
});

// Test 10: Empty search results
runner.test('Search with no matches should return empty array', () => {
  const results = flightModule.searchEngine.searchFlights('NonExistent', 'City');
  assertEqual(results.length, 0, 'Should return no results for non-existent cities');
});

// Run all tests
runner.run().then(success => {
  process.exit(success ? 0 : 1);
});

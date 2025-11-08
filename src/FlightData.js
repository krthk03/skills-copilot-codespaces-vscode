/**
 * FlightData.js
 * Data models and sample flight data for the Check24 flight module
 */

class Flight {
  constructor(id, airline, flightNumber, departure, arrival, price, duration, stops) {
    this.id = id;
    this.airline = airline;
    this.flightNumber = flightNumber;
    this.departure = departure;
    this.arrival = arrival;
    this.price = price;
    this.duration = duration;
    this.stops = stops;
  }

  getDetails() {
    return `${this.airline} ${this.flightNumber}: ${this.departure.city} to ${this.arrival.city} - €${this.price}`;
  }
}

class Airport {
  constructor(code, city, country) {
    this.code = code;
    this.city = city;
    this.country = country;
  }
}

// Sample flight data
const sampleFlights = [
  new Flight(
    1,
    "Lufthansa",
    "LH400",
    new Airport("FRA", "Frankfurt", "Germany"),
    new Airport("JFK", "New York", "USA"),
    450,
    "8h 30m",
    0
  ),
  new Flight(
    2,
    "Air France",
    "AF1234",
    new Airport("CDG", "Paris", "France"),
    new Airport("JFK", "New York", "USA"),
    520,
    "8h 45m",
    0
  ),
  new Flight(
    3,
    "British Airways",
    "BA178",
    new Airport("LHR", "London", "UK"),
    new Airport("JFK", "New York", "USA"),
    480,
    "7h 55m",
    0
  ),
  new Flight(
    4,
    "Ryanair",
    "FR2156",
    new Airport("BER", "Berlin", "Germany"),
    new Airport("BCN", "Barcelona", "Spain"),
    89,
    "2h 30m",
    0
  ),
  new Flight(
    5,
    "KLM",
    "KL1007",
    new Airport("AMS", "Amsterdam", "Netherlands"),
    new Airport("JFK", "New York", "USA"),
    495,
    "8h 15m",
    0
  ),
  new Flight(
    6,
    "EasyJet",
    "U22545",
    new Airport("MUC", "Munich", "Germany"),
    new Airport("LGW", "London", "UK"),
    125,
    "2h 10m",
    0
  ),
  new Flight(
    7,
    "Emirates",
    "EK45",
    new Airport("DXB", "Dubai", "UAE"),
    new Airport("JFK", "New York", "USA"),
    750,
    "14h 30m",
    0
  ),
  new Flight(
    8,
    "Turkish Airlines",
    "TK1988",
    new Airport("IST", "Istanbul", "Turkey"),
    new Airport("JFK", "New York", "USA"),
    580,
    "11h 45m",
    0
  )
];

module.exports = { Flight, Airport, sampleFlights };

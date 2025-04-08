export const IncludeFlightFields = {
  id: true,
  flightNumber: true,
  airplaneId: true,
  departureAirportCode: true,
  arrivalAirportCode: true,
  departureTime: true,
  arrivalTime: true,
  totalSeats: true,
  price: true,
  boardingGate: true,
};

export const IncludeAirplaneFields = {
  id: true,
  modelNumber: true,
  capacity: true,
};

export const IncludeAirportFields = {
  id: true,
  name: true,
  code: true,
  address: true,
  cityId: true,
};

export class FlightError {
  public static ServiceError = {
    AirplaneNotFound: {
      field: "airplaneId",
      message: "Airplane with requested id not found!",
    },
    DepartureAirportNotFound: {
      field: "departureAirportCode",
      message: "Departure airport with requested code not found!",
    },
    ArrivalAirportNotFound: {
      field: "arrivalAirportCode",
      message: "Arrival airport with requested code not found!",
    },
    TotalSeatsExceedsAirplaneCapacity: {
      field: "totalSeats",
      message: "Total seats exceeds airplane capacity!",
    },
    ArrivalTimeBeforeDepartureTime: {
      field: "arrivalTime",
      message: "Arrival time must be after departure time!",
    },
    SameDepartureAndArrivalAirport: {
      field: "arrivalAirportCode",
      message: "Departure and arrival airports can not be the same!",
    },
  };
}

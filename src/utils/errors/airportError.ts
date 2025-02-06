export class AirportError {
  static ValidationError = {};

  static ServiceError = {
    AirportAlreadyExists: {
      field: "name || code",
      message: "Airport with same name or code already exists!",
    },
    CityNotFound: {
      field: "cityName",
      message: "No city was found with requested city name!",
    },
  };
}

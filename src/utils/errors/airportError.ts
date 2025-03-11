export class AirportError {
  static ValidationError = {
    IdMustBeNumber: {
      field: "id",
      message: "ID must be a number!",
    },
    CityNameRequired: {
      field: "cityName",
      message: "City Name is required!",
    },
    CityNameMustBeString: {
      field: "cityName",
      message: "City Name must be a string!",
    },
    AirportCodeRequired: {
      field: "code",
      message: "Airport code is required!",
    },
    AirportCodeMustBeString: {
      field: "code",
      message: "Airport code must be a string!",
    },
    AirportNameRequired: {
      field: "name",
      message: "Airport name is required!",
    },
    AirportNameMustBeString: {
      field: "name",
      message: "Airport name must be a string!",
    },
    AirportAddressRequired: {
      field: "address",
      message: "Airport address is required!",
    },
    AirportAddressMustBeString: {
      field: "address",
      message: "Airport address must be a string!",
    },
  };

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

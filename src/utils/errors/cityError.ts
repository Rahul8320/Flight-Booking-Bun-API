export class CityError {
  static ValidationError = {};
  static ServiceError = {
    CityNameExists: {
      field: "name",
      message: "City with this name already exists!",
    },
  };
}

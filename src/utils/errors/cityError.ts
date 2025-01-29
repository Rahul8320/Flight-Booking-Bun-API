export class CityError {
  static ValidationError = {
    NameRequired: {
      field: "name",
      message: "City name is required!",
    },
    NameMustBeString: {
      field: "name",
      message: "City name must be a string!",
    },
    NameMinLength: {
      field: "name",
      message: "City name must be 3 characters long!",
    },
    NameMaxLength: {
      field: "name",
      message: "City name can not be more than 100 characters!",
    },
    CodeRequired: {
      field: "code",
      message: "City code is required!",
    },
    CodeMustBeString: {
      field: "code",
      message: "City code must be a string!",
    },
    CodeMinLength: {
      field: "code",
      message: "City code must be 3 characters long!",
    },
    CodeMaxLength: {
      field: "code",
      message: "City code can not be more than 10 characters!",
    },
  };
  static ServiceError = {
    CityNameExists: {
      field: "name",
      message: "City with this name already exists!",
    },
  };
}

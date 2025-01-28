export class AirplaneError {
  static ValidationError = {
    ModelNumberRequired: {
      field: "modelNumber",
      message: "ModelNumber is required!",
    },
    ModelNumberMustBeString: {
      field: "modelNumber",
      message: "ModelNumber must be a string!",
    },
    ModelNumberExists: {
      field: "modelNumber",
      message: "Model number already exists!",
    },
    CapacityMustBeNumber: {
      field: "capacity",
      message: "Capacity must be a number!",
    },
    CapacityGreaterThanZero: {
      field: "capacity",
      message: "Capacity must be greater than 0!",
    },
    IdMustBeNumber: {
      field: "id",
      message: "ID must be a number!",
    },
  };
}

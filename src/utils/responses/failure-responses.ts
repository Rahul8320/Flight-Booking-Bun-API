import { ApiFailureResponse, type IValidationData } from "./api-response";

export class FailureResponse {
  static serverError(error: string) {
    return new ApiFailureResponse("Something went wrong!", error);
  }

  static validationFailure(data: IValidationData[]) {
    return new ApiFailureResponse("Invalid request body", data);
  }
}

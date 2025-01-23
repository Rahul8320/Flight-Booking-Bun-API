import { ApiFailureResponse, type IValidationData } from "./api-response";

export class FailureResponse {
  static ServerError(error: string) {
    return new ApiFailureResponse("Something went wrong!", error);
  }

  static ValidationFailure(data: IValidationData[]) {
    return new ApiFailureResponse("Validation Failed!", data);
  }

  static ResourceNotFound(data: any | null = null) {
    return new ApiFailureResponse("Resource not found!", data);
  }
}

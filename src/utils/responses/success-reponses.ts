import { ApiSuccessResponse } from "./api-response";

export class SuccessResponse {
  static HealthCheck() {
    return new ApiSuccessResponse("Api is healthy", {});
  }

  static Created<T>(data: T) {
    return new ApiSuccessResponse("Resource created successfully!", data);
  }

  static Fetched<T>(data: T[] | T) {
    return new ApiSuccessResponse("Resource fetched successfully!", data);
  }

  static Updated<T>(data: T) {
    return new ApiSuccessResponse("Resource updated successfully!", data);
  }

  static Deleted<T>(data: T) {
    return new ApiSuccessResponse("Resource deleted successfully!", data);
  }
}

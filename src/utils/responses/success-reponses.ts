import type { Airplane } from "@prisma/client";
import { ApiSuccessResponse } from "./api-response";

export class SuccessResponse {
  static HealthCheck() {
    return new ApiSuccessResponse("Api is healthy", {});
  }

  static AirplaneCreated(data: Airplane) {
    return new ApiSuccessResponse("Airplane created successfully!", data);
  }

  static AirplaneFetched(data: Airplane[]) {
    return new ApiSuccessResponse("Airplanes fetched successfully!", data);
  }
}

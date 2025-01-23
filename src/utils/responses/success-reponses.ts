import type { Airplane } from "@prisma/client";
import { ApiSuccessResponse } from "./api-response";

export class SuccessResponse {
  static healthCheck() {
    return new ApiSuccessResponse("Api is healthy", {});
  }

  static airplaneCreated(data: Airplane) {
    return new ApiSuccessResponse("Airplane created successfully!", data);
  }
}

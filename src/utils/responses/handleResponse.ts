import { ServiceSuccessResult } from "../../services";
import { ServiceValidationErrorResult } from "../../services";
import type { ServiceResult } from "../../services";
import type { IValidationData } from "./api-response";

/**
 * @description Helper method to handle service response and extract appropriate data
 * @param {ServiceResult<T>} result - Service result containing success data or validation errors
 * @returns {T | IValidationData[] | null} Extracted data, validation errors, or null if not found
 */
export function handleResponse<T>(
  result: ServiceResult<T>
): T | IValidationData[] | null {
  if (result instanceof ServiceSuccessResult) {
    return result.data;
  } else if (result instanceof ServiceValidationErrorResult) {
    return result.validationErrors;
  } else {
    return null;
  }
}

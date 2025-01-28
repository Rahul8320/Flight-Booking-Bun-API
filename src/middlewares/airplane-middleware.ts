import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../models/statusCodes";
import { AirplaneError, FailureResponse, type IValidationData } from "../utils";

export function validateCreateAirplane(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { modelNumber, capacity } = req.body;

  let errors: IValidationData[] = [];

  errors = validateModelNumber(modelNumber, errors);
  errors = validateCapacity(capacity, errors);

  if (Object.keys(errors).length > 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(FailureResponse.ValidationFailure(errors));

    return;
  }

  next();
}

function validateModelNumber(
  modelNumber: any,
  errors: IValidationData[]
): IValidationData[] {
  if (!modelNumber) {
    errors.push(AirplaneError.ValidationError.ModelNumberRequired);
  }

  if (modelNumber && typeof modelNumber !== "string") {
    errors.push(AirplaneError.ValidationError.ModelNumberRequired);
  }

  return errors;
}

function validateCapacity(capacity: any, errors: IValidationData[]) {
  if (capacity && typeof capacity !== "number") {
    errors.push(AirplaneError.ValidationError.CapacityMustBeNumber);
  }

  if (capacity && capacity <= 0) {
    errors.push(AirplaneError.ValidationError.CapacityGreaterThanZero);
  }
  return errors;
}

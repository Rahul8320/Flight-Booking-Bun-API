import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../models/statusCodes";
import { AirplaneError, FailureResponse, type IValidationData } from "../utils";

export function validateCreateAirplane(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { modelNumber, capacity } = req.body;

  const errors: IValidationData[] = [];

  if (!modelNumber) {
    errors.push(AirplaneError.ValidationError.ModelNumberRequired);
  }

  if (modelNumber && typeof modelNumber !== "string") {
    errors.push(AirplaneError.ValidationError.ModelNumberRequired);
  }

  if (capacity && typeof capacity !== "number") {
    errors.push(AirplaneError.ValidationError.CapacityMustBeNumber);
  }

  if (capacity && capacity <= 0) {
    errors.push(AirplaneError.ValidationError.CapacityGreaterThanZero);
  }

  if (Object.keys(errors).length > 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(FailureResponse.requestValidationFailure(errors));

    return;
  }

  next();
}

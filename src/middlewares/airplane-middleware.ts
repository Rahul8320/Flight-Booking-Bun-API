import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../models/statusCodes";
import { FailureResponse, type IValidationData } from "../utils";

export function validateCreateAirplane(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { modelNumber, capacity } = req.body;

  const errors: IValidationData[] = [];

  if (!modelNumber) {
    errors.push({ field: "modelNumber", message: "ModelNumber is required!" });
  }

  if (modelNumber && typeof modelNumber !== "string") {
    errors.push({
      field: "modelNumber",
      message: "ModelNumber must be a string!",
    });
  }

  if (capacity && typeof capacity !== "number") {
    errors.push({ field: "capacity", message: "Capacity must be a number!" });
  }

  if (capacity && capacity <= 0) {
    errors.push({
      field: "capacity",
      message: "Capacity must be greater than 0!",
    });
  }

  if (Object.keys(errors).length > 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(FailureResponse.validationFailure(errors));

    return;
  }

  next();
}

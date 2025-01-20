import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../models/statusCodes";

export function validateCreateAirplane(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { modelNumber, capacity } = req.body;

  const errors: Record<string, string[]> = {};

  if (!modelNumber) {
    errors["modelNumber"] = ["ModelNumber is required!"];
  }

  if (modelNumber && typeof modelNumber !== "string") {
    errors["modelNumber"] = ["ModelNumber must be a string!"];
  }

  if (capacity && typeof capacity !== "number") {
    errors["capacity"] = ["Capacity must be a number!"];
  }

  if (capacity && capacity <= 0) {
    if (errors.hasOwnProperty("capacity")) {
      errors["capacity"].push("Capacity must be greater than 0!");
    } else {
      errors["capacity"] = ["Capacity must be greater than 0!"];
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid request body",
      data: null,
      error: errors,
    });

    return;
  }

  next();
}

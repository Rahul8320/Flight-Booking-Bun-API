import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../models";
import { FailureResponse } from "../utils";

export function validateRequest(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        res
          .status(StatusCodes.BAD_REQUEST)
          .json(FailureResponse.ValidationFailure(formattedErrors));
        return;
      }

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          FailureResponse.ServerError(
            "An unknown error occurred in validating this request."
          )
        );
      return;
    }
  };
}

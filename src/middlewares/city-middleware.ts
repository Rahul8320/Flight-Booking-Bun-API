import type { Request, Response, NextFunction } from "express";
import { CityError, FailureResponse, type IValidationData } from "../utils";
import { StatusCodes } from "../models";

export function validateCreateCity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, code } = req.body;
  let errors: IValidationData[] = [];

  errors = validateCityName(name, errors);
  errors = validateCityCode(code, errors);

  if (Object.keys(errors).length > 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(FailureResponse.ValidationFailure(errors));

    return;
  }

  next();
}
function validateCityName(
  name: any,
  errors: IValidationData[]
): IValidationData[] {
  if (!name) {
    errors.push(CityError.ValidationError.NameRequired);
  }

  if (name && typeof name !== "string") {
    errors.push(CityError.ValidationError.NameMustBeString);
  }

  if ((name as string).length < 3) {
    errors.push(CityError.ValidationError.NameMinLength);
  }

  if ((name as string).length > 100) {
    errors.push(CityError.ValidationError.NameMaxLength);
  }

  return errors;
}

function validateCityCode(code: any, errors: IValidationData[]) {
  if (!code) {
    errors.push(CityError.ValidationError.CodeRequired);
  }

  if (code && typeof code !== "string") {
    errors.push(CityError.ValidationError.CodeMustBeString);
  }

  if ((code as string).length < 3) {
    errors.push(CityError.ValidationError.CodeMinLength);
  }

  if ((code as string).length > 10) {
    errors.push(CityError.ValidationError.CodeMaxLength);
  }

  return errors;
}

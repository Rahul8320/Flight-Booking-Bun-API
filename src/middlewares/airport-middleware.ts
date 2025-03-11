import type { NextFunction, Request, Response } from "express";
import { AirportError, FailureResponse, type IValidationData } from "../utils";
import { StatusCodes } from "../models";

export function validateCreateAirport(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, code, address, cityName } = req.body;

  let errors: IValidationData[] = [];

  errors = validateAirportName(name, errors);
  errors = validateAirportCode(code, errors);
  errors = validateAirportCityName(cityName, errors);
  errors = validateAirportAddress(address, errors);

  if (Object.keys(errors).length > 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(FailureResponse.ValidationFailure(errors));

    return;
  }

  next();
}

export function validateAirportId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  let errors: IValidationData[] = [];

  errors = validateId(id, errors);

  if (Object.keys(errors).length > 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(FailureResponse.ValidationFailure(errors));

    return;
  }

  next();
}

function validateAirportCode(
  code: any,
  errors: IValidationData[]
): IValidationData[] {
  if (!code) {
    errors.push(AirportError.ValidationError.AirportCodeRequired);
  }

  if (code && typeof code !== "string") {
    errors.push(AirportError.ValidationError.AirportCodeMustBeString);
  }

  return errors;
}

function validateAirportName(
  name: any,
  errors: IValidationData[]
): IValidationData[] {
  if (!name) {
    errors.push(AirportError.ValidationError.AirportNameRequired);
  }

  if (name && typeof name !== "string") {
    errors.push(AirportError.ValidationError.AirportNameMustBeString);
  }

  return errors;
}

function validateAirportCityName(
  cityName: any,
  errors: IValidationData[]
): IValidationData[] {
  if (!cityName) {
    errors.push(AirportError.ValidationError.CityNameRequired);
  }

  if (cityName && typeof cityName !== "string") {
    errors.push(AirportError.ValidationError.CityNameMustBeString);
  }

  return errors;
}

function validateAirportAddress(
  address: any,
  errors: IValidationData[]
): IValidationData[] {
  if (!address) {
    errors.push(AirportError.ValidationError.AirportAddressRequired);
  }

  if (address && typeof address !== "string") {
    errors.push(AirportError.ValidationError.AirportAddressMustBeString);
  }

  return errors;
}

function validateId(id: any, errors: IValidationData[]): IValidationData[] {
  const num = Number(id);

  if (isNaN(num) || isFinite(num) === false) {
    errors.push(AirportError.ValidationError.IdMustBeNumber);
  }

  return errors;
}

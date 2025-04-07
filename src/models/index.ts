import type { ICreateAirplaneInput } from "./Requests/airplaneInput";
import type { ICreateCityInput } from "./Requests/cityInput";
import type { ICreateAirportInput } from "./Requests/airportInput";
import { StatusCodes } from "./statusCodes";
import type { ICreateFlightInput } from "./schemas/createFlightSchema";
import { createFlightSchema } from "./schemas/createFlightSchema";

export { StatusCodes, createFlightSchema };
export type {
  ICreateCityInput,
  ICreateAirplaneInput,
  ICreateAirportInput,
  ICreateFlightInput,
};

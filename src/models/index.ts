import type { ICreateAirplaneInput } from "./Requests/airplaneInput";
import type { ICreateCityInput } from "./Requests/cityInput";
import type { ICreateAirportInput } from "./Requests/airportInput";
import { StatusCodes } from "./statusCodes";
import {
  createFlightSchema,
  type ICreateFlightInput,
} from "./schemas/createFlightSchema";
import {
  getFlightSchema,
  type IGetFlightQuery,
} from "./schemas/getFlightSchema";

export { StatusCodes, createFlightSchema, getFlightSchema };
export type {
  ICreateCityInput,
  ICreateAirplaneInput,
  ICreateAirportInput,
  ICreateFlightInput,
  IGetFlightQuery,
};

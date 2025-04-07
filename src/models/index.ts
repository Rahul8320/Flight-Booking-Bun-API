import type { ICreateAirplaneInput } from "./Requests/airplaneInput";
import type { ICreateCityInput } from "./Requests/cityInput";
import type { ICreateAirportInput } from "./Requests/airportInput";
import { StatusCodes } from "./statusCodes";
import type { ICreateFlightInput } from "./Requests/flightInput";

export { StatusCodes };
export type {
  ICreateCityInput,
  ICreateAirplaneInput,
  ICreateAirportInput,
  ICreateFlightInput,
};

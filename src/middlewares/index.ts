import {
  validateCreateAirplane,
  validateAirplaneId,
  validateUpdateAirplane,
} from "./airplane-middleware";

import { validateCreateCity, validateCityId } from "./city-middleware";

import { validateAirportId, validateCreateAirport } from "./airport-middleware";
import { validateRequest } from "./validateRequest-middleware";

export {
  validateCreateAirplane,
  validateAirplaneId,
  validateUpdateAirplane,
  validateCreateCity,
  validateCityId,
  validateAirportId,
  validateCreateAirport,
  validateRequest,
};

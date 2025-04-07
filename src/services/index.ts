import { AirplaneService } from "./airplane.service";
import { AirportService } from "./airport.service";
import { CityService } from "./city.service";
import { FlightService } from "./flight.service";
import type { ServiceResult } from "./service-result";

import {
  ServiceSuccessResult,
  ServiceValidationErrorResult,
} from "./service-result";

export {
  AirplaneService,
  AirportService,
  CityService,
  FlightService,
  ServiceSuccessResult,
  ServiceValidationErrorResult,
};

export type { ServiceResult };

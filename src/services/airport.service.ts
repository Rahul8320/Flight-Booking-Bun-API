import type { Airport } from "@prisma/client";
import { StatusCodes, type ICreateAirportInput } from "../models";
import { AirportRepository, CityRepository } from "../repositories";
import {
  ServiceSuccessResult,
  ServiceValidationErrorResult,
  type ServiceResult,
} from "./service-result";
import { AirportError, ApiException } from "../utils";

export class AirportService {
  private _airportRepository: AirportRepository;
  private _cityRepository: CityRepository;

  constructor() {
    this._airportRepository = new AirportRepository();
    this._cityRepository = new CityRepository();
  }

  /**
   * @description Create a new Airport
   * @param {ICreateAirportInput} input - The airport input data
   * @returns {Promise<ServiceResult<Airport>>} Created airport or validation errors
   */
  async createAirport(
    input: ICreateAirportInput
  ): Promise<ServiceResult<Airport>> {
    try {
      const isAirportExists = await this._airportRepository.IsAirportExists(
        input.name,
        input.code
      );

      if (isAirportExists) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          AirportError.ServiceError.AirportAlreadyExists,
        ]);
      }

      const city = await this._cityRepository.GetCityByName(input.cityName);

      if (!city) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          AirportError.ServiceError.CityNotFound,
        ]);
      }

      const airportInput = {
        name: input.name,
        code: input.code,
        address: input.address,
        cityId: city.id,
      };

      const airport = await this._airportRepository.create(airportInput);
      return new ServiceSuccessResult<Airport>(StatusCodes.CREATED, airport);
    } catch (err: any) {
      throw new ApiException("Failed to create airport!", err);
    }
  }
}

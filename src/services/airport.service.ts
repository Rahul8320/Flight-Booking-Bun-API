import type { Airport } from "@prisma/client";
import { StatusCodes, type ICreateAirportInput } from "../models";
import { AirportRepository, CityRepository } from "../repositories";
import {
  ServiceResult,
  ServiceSuccessResult,
  ServiceValidationErrorResult,
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
      const isAirportExists = await this._airportRepository.isAirportExists(
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

  /**
   * @description Get all airports
   * @returns {Promise<ServiceResult<Airport[]>>} List of airports or not found
   */
  async getAirports(): Promise<ServiceResult<Airport[]>> {
    try {
      const airports = await this._airportRepository.getAll();

      if (airports.length === 0) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      return new ServiceSuccessResult<Airport[]>(StatusCodes.OK, airports);
    } catch (err: any) {
      throw new ApiException("Failed to fetch airports!", err);
    }
  }

  /**
   * @description Get an airport
   * @param {number} id - ID of the airport
   * @returns {Promise<ServiceResult<Airport>>} Airport or not found
   */
  async getAirport(id: number): Promise<ServiceResult<Airport>> {
    try {
      const airport = await this._airportRepository.get(id);

      if (airport === null || airport === undefined) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      return new ServiceSuccessResult<Airport>(StatusCodes.OK, airport);
    } catch (err: any) {
      throw new ApiException(`Failed to fetch airport with id ${id}!`, err);
    }
  }

  /**
   * @description Delete an airport
   * @param {number} id - ID of the airport
   * @returns {Promise<ServiceResult<Airport>>} Deleted airport or not found
   */
  async deleteAirport(id: number): Promise<ServiceResult<Airport>> {
    try {
      const airport = await this._airportRepository.get(id);

      if (airport === null || airport === undefined) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      const deletedAirport = await this._airportRepository.delete(id);

      return new ServiceSuccessResult<Airport>(StatusCodes.OK, deletedAirport);
    } catch (err: any) {
      throw new ApiException(`Failed to delete airport with id ${id}!`, err);
    }
  }
}

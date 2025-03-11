import type { City } from "@prisma/client";
import { CityRepository } from "../repositories";
import {
  ServiceResult,
  ServiceSuccessResult,
  ServiceValidationErrorResult,
} from "./service-result";
import { ApiException, CityError } from "../utils";
import { StatusCodes, type ICreateCityInput } from "../models";

export class CityService {
  private _cityRepository: CityRepository;

  constructor() {
    this._cityRepository = new CityRepository();
  }

  /**
   * @description Create a new city
   * @param {CreateCityInput} input - The city input data
   * @returns {Promise<ServiceResult<City>>} Created city or validation errors
   */
  async createCity(input: ICreateCityInput): Promise<ServiceResult<City>> {
    try {
      const isCityExists = await this._cityRepository.IsCityExists(input.name);

      if (isCityExists) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          CityError.ServiceError.CityNameExists,
        ]);
      }

      const city = await this._cityRepository.create(input);
      return new ServiceSuccessResult<City>(StatusCodes.CREATED, city);
    } catch (err: any) {
      throw new ApiException("Failed to create city!", err);
    }
  }

  /**
   * @description Get all cities
   * @returns {Promise<ServiceResult<City[]>>} List of cities or not found
   */
  async getCities(): Promise<ServiceResult<City[]>> {
    try {
      const cities = await this._cityRepository.getAll();

      if (cities.length === 0) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      return new ServiceSuccessResult<City[]>(StatusCodes.OK, cities);
    } catch (err: any) {
      throw new ApiException("Failed to fetch cities!", err);
    }
  }

  /**
   * @description Get city by id
   * @param {number} id - ID of the city
   * @returns {Promise<ServiceResult<City>>} City or not found
   */
  async getCity(id: number): Promise<ServiceResult<City>> {
    try {
      const city = await this._cityRepository.get(id);

      if (city === null || city === undefined) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      return new ServiceSuccessResult<City>(StatusCodes.OK, city);
    } catch (err: any) {
      throw new ApiException(`Failed to fetch city with id ${id}!`, err);
    }
  }

  /**
   * @description Delete a city
   * @param {number} id - ID of the city to delete
   * @returns {Promise<ServiceResult<City>>} Deleted city or not found
   */
  async deleteCity(id: number): Promise<ServiceResult<City>> {
    try {
      const city = await this._cityRepository.get(id);

      if (city === null || city === undefined) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      const deletedCity = await this._cityRepository.delete(id);
      return new ServiceSuccessResult<City>(StatusCodes.OK, deletedCity);
    } catch (err: any) {
      throw new ApiException(`Failed to delete city with id ${id}!`, err);
    }
  }
}

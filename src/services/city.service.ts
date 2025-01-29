import type { City } from "@prisma/client";
import { CityRepository } from "../repositories";
import {
  ServiceSuccessResult,
  ServiceValidationErrorResult,
  type ServiceResult,
} from "./service-result";
import { ApiExecption, CityError } from "../utils";
import { StatusCodes } from "../models";

type CreateCityInput = Omit<City, "id" | "createdAt" | "updatedAt">;

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
  async createCity(input: CreateCityInput): Promise<ServiceResult<City>> {
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
      throw new ApiExecption("Failed to create airplane!", err);
    }
  }
}

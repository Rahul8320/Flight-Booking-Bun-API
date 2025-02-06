import { AirplaneRepository } from "../repositories";
import type { Airplane } from "@prisma/client";
import { AirplaneError, ApiExecption } from "../utils";
import {
  ServiceResult,
  ServiceSuccessResult,
  ServiceValidationErrorResult,
} from "./service-result";
import { StatusCodes, type ICreateAirplaneInput } from "../models";

export class AirplaneService {
  private _airplaneRepository: AirplaneRepository;

  constructor() {
    this._airplaneRepository = new AirplaneRepository();
  }

  /**
   * @description Create a new airplane
   * @param {ICreateAirplaneInput} input - The airplane input data
   * @returns {Promise<ServiceResult<Airplane>>} Created airplane or validation errors
   */
  async createAirplane(
    input: ICreateAirplaneInput
  ): Promise<ServiceResult<Airplane>> {
    try {
      const isModelNumberExists =
        await this._airplaneRepository.IsModelNumberExists(input.modelNumber);

      if (isModelNumberExists) {
        return new ServiceValidationErrorResult(StatusCodes.BAD_REQUEST, [
          AirplaneError.ServiceError.ModelNumberExists,
        ]);
      }

      const airplane = await this._airplaneRepository.create(input);
      return new ServiceSuccessResult<Airplane>(StatusCodes.CREATED, airplane);
    } catch (err: any) {
      throw new ApiExecption("Failed to create airplane!", err);
    }
  }

  /**
   * @description Get all airplanes
   * @returns {Promise<ServiceResult<Airplane[]>>} List of airplanes or not found
   */
  async getAirplanes(): Promise<ServiceResult<Airplane[]>> {
    try {
      const airplanes = await this._airplaneRepository.getAll();

      if (airplanes.length === 0) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      return new ServiceSuccessResult<Airplane[]>(StatusCodes.OK, airplanes);
    } catch (err: any) {
      throw new ApiExecption("Failed to fetch airplanes!", err);
    }
  }

  /**
   * @description Get airplane by id
   * @param {number} id - ID of the airplane
   * @returns {Promise<ServiceResult<Airplane>>} Airplane or not found
   */
  async getAirplane(id: number): Promise<ServiceResult<Airplane>> {
    try {
      const airplane = await this._airplaneRepository.get(id);

      if (airplane === null || airplane === undefined) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      return new ServiceSuccessResult<Airplane>(StatusCodes.OK, airplane);
    } catch (err: any) {
      throw new ApiExecption(`Failed to fetch airplane with id ${id}!`, err);
    }
  }

  /**
   * @description Update airplane capacity
   * @param {number} id - ID of the airplane to update
   * @param {number} capacity - New capacity value
   * @returns {Promise<ServiceResult<Airplane>>} Updated airplane or not found
   */
  async updateAirplane(
    id: number,
    capacity: number
  ): Promise<ServiceResult<Airplane>> {
    try {
      const airplane = await this._airplaneRepository.get(id);

      if (airplane === null || airplane === undefined) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      airplane.capacity = capacity;
      airplane.updatedAt = new Date();

      const updatedAirplane = await this._airplaneRepository.update(
        id,
        airplane
      );
      return new ServiceSuccessResult<Airplane>(
        StatusCodes.OK,
        updatedAirplane
      );
    } catch (err: any) {
      throw new ApiExecption(`Failed to update airplane with id ${id}!`, err);
    }
  }

  /**
   * @description Delete an airplane
   * @param {number} id - ID of the airplane to delete
   * @returns {Promise<ServiceResult<Airplane>>} Deleted airplane or not found
   */
  async deleteAirplane(id: number): Promise<ServiceResult<Airplane>> {
    try {
      const airplane = await this._airplaneRepository.get(id);

      if (airplane === null || airplane === undefined) {
        return new ServiceResult(StatusCodes.NOT_FOUND);
      }

      const deletedAirplane = await this._airplaneRepository.delete(id);
      return new ServiceSuccessResult<Airplane>(
        StatusCodes.OK,
        deletedAirplane
      );
    } catch (err: any) {
      throw new ApiExecption(`Failed to delete airplane with id ${id}!`, err);
    }
  }
}

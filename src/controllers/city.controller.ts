import type { Request, Response } from "express";
import { FailureResponse } from "../utils";
import type { IValidationData } from "../utils";
import { SuccessResponse } from "../utils";
import { CityService } from "../services";
import { handleResponse } from "../utils";
import { StatusCodes } from "../models";
import type { City } from "@prisma/client";
import { logger } from "../config";

export class CityController {
  private _cityService: CityService;

  constructor() {
    this._cityService = new CityService();
    this.createCity = this.createCity.bind(this);
    this.getCities = this.getCities.bind(this);
    this.getCity = this.getCity.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
  }

  /**
   * @description Create a new city
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns newly created city
   */
  async createCity(req: Request, res: Response): Promise<void> {
    try {
      const { name, code } = req.body;

      const response = await this._cityService.createCity({
        name,
        code,
      });

      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.CREATED) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Created(result as City));

        return;
      }

      res
        .status(response.statusCode)
        .json(FailureResponse.ValidationFailure(result as IValidationData[]));

      return;
    } catch (err: any) {
      logger.error(err.message || "Something wrong happened!", err);

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          FailureResponse.ServerError(
            err.message || "Something wrong happened!"
          )
        );

      return;
    }
  }

  /**
   * @description Fetched all cities
   * @param {Request} _req - The request object
   * @param {Response} res - The response object
   * @returns All cities
   */
  async getCities(_req: Request, res: Response): Promise<void> {
    try {
      const response = await this._cityService.getCities();
      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Fetched(result as City[]));

        return;
      }

      res.status(response.statusCode).json(FailureResponse.ResourceNotFound());

      return;
    } catch (err: any) {
      logger.error(err.message || "Something wrong happened!", err);

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          FailureResponse.ServerError(
            err.message || "Something wrong happened!"
          )
        );

      return;
    }
  }

  /**
   * @description Get city by id
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns City with specified id
   */
  async getCity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const intID = parseInt(id);

      const response = await this._cityService.getCity(intID);
      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Fetched(result as City));

        return;
      }

      res.status(response.statusCode).json(FailureResponse.ResourceNotFound());

      return;
    } catch (err: any) {
      logger.error(err.message || "Something wrong happened!", err);

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          FailureResponse.ServerError(
            err.message || "Something wrong happened!"
          )
        );

      return;
    }
  }

  /**
   * @description Delete city
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns Deleted city
   */
  async deleteCity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const intID = parseInt(id);

      const response = await this._cityService.deleteCity(intID);
      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Deleted(result as City));

        return;
      }

      res.status(response.statusCode).json(FailureResponse.ResourceNotFound());

      return;
    } catch (err: any) {
      logger.error(err.message || "Something wrong happened!", err);

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          FailureResponse.ServerError(
            err.message || "Something wrong happened!"
          )
        );

      return;
    }
  }
}

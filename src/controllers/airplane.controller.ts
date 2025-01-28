import type { Request, Response } from "express";
import type { Airplane } from "@prisma/client";
import { logger } from "../config";
import { StatusCodes } from "../models";
import {
  AirplaneService,
  ServiceSuccessResult,
  ServiceValidationErrorResult,
  type ServiceResult,
} from "../services";
import {
  FailureResponse,
  SuccessResponse,
  type IValidationData,
} from "../utils";

export class AirplaneController {
  private _airplaneService: AirplaneService;

  constructor() {
    this._airplaneService = new AirplaneService();
    this.createAirplane = this.createAirplane.bind(this);
    this.getAirplanes = this.getAirplanes.bind(this);
    this.getAirplane = this.getAirplane.bind(this);
    this.updateAirplane = this.updateAirplane.bind(this);
    this.deleteAirplane = this.deleteAirplane.bind(this);
  }

  /**
   * @description Create a new airplane
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns newly created airplane
   */
  async createAirplane(req: Request, res: Response): Promise<void> {
    try {
      const { modelNumber, capacity } = req.body;

      const response = await this._airplaneService.createAirplane({
        modelNumber,
        capacity,
      });

      const result = this.handleResponse(response);

      if (response.statusCode === StatusCodes.CREATED) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Created(result as Airplane));

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
   * @description Fetched all airplanes
   * @param {Request} _req - The request object
   * @param {Response} res - The response object
   * @returns All airplanes
   */
  async getAirplanes(_req: Request, res: Response): Promise<void> {
    try {
      const response = await this._airplaneService.getAirplanes();

      const result = this.handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Fetched(result as Airplane[]));

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
   * @description Get airplane by id
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns Airplane with specified id
   */
  async getAirplane(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const intID = parseInt(id);

      const response = await this._airplaneService.getAirplane(intID);

      const result = this.handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Fetched(result as Airplane));

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
   * @description Update airplane capacity
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns Updated airplane
   */
  async updateAirplane(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { capacity } = req.body;
      const intID = parseInt(id);

      const response = await this._airplaneService.updateAirplane(
        intID,
        capacity
      );

      const result = this.handleResponse(response);

      if (response.statusCode == StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Updated(result as Airplane));

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
   * @description Delete airplane
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns Deleted airplane
   */
  async deleteAirplane(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const intID = parseInt(id);

      const response = await this._airplaneService.deleteAirplane(intID);

      const result = this.handleResponse(response);

      if (response.statusCode == StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Deleted(result as Airplane));

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
   * @description Helper method to handle service response and extract appropriate data
   * @param {ServiceResult<T>} result - Service result containing success data or validation errors
   * @returns {T | IValidationData[] | null} Extracted data, validation errors, or null if not found
   */
  private handleResponse<T>(
    result: ServiceResult<T>
  ): T | IValidationData[] | null {
    if (result instanceof ServiceSuccessResult) {
      return result.data;
    } else if (result instanceof ServiceValidationErrorResult) {
      return result.validationErrors;
    } else {
      return null;
    }
  }
}

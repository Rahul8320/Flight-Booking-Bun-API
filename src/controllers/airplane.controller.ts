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
  }

  /**
   * @description Create a new airplane
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   */
  async createAirplane(req: Request, res: Response): Promise<void> {
    try {
      const { modelNumber, capacity } = req.body;

      const response = await this._airplaneService.createAirplane({
        modelNumber,
        capacity,
      });

      const result = this.handleResponse(response);

      if (response.statusCode == StatusCodes.CREATED) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.AirplaneCreated(result as Airplane));

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

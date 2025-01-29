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
}

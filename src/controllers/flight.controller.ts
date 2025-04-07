import type { Request, Response } from "express";
import { logger } from "../config";
import { StatusCodes, type ICreateFlightInput } from "../models";
import { FlightService } from "../services";
import {
  FailureResponse,
  handleResponse,
  SuccessResponse,
  type IValidationData,
} from "../utils";
import type { Flight } from "@prisma/client";

export class FlightController {
  private _flightService: FlightService;

  constructor() {
    this._flightService = new FlightService();
    this.createFlight = this.createFlight.bind(this);
  }

  /**
   * @description Create a new flight
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns newly created flight
   */
  public async createFlight(req: Request, res: Response): Promise<void> {
    try {
      const input: ICreateFlightInput = req.body;

      const response = await this._flightService.createFlight(input);

      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.CREATED) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Created(result as Flight));

        return;
      }

      res
        .status(response.statusCode)
        .json(FailureResponse.ValidationFailure(result as IValidationData[]));
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

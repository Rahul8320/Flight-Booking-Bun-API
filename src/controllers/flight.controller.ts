import type { Request, Response } from "express";
import { logger } from "../config";
import {
  getFlightSchema,
  StatusCodes,
  type ICreateFlightInput,
} from "../models";
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
    this.getAllFlights = this.getAllFlights.bind(this);
  }

  /**
   * @description Create a new flight
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns newly created flight
   */
  public async createFlight(req: Request, res: Response): Promise<void> {
    try {
      const input: ICreateFlightInput = req.body as ICreateFlightInput;

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

  /**
   * @description Get all flights based on query
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns list of flights
   */
  public async getAllFlights(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = getFlightSchema.safeParse(req.query);

      if (validationResult.success === false) {
        const formattedErrors = validationResult.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            FailureResponse.ValidationFailure(
              formattedErrors as IValidationData[]
            )
          );

        return;
      }

      const response = await this._flightService.getAllFlights(
        validationResult.data
      );

      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Fetched(result as Flight[]));
        return;
      }

      if (response.statusCode === StatusCodes.BAD_REQUEST) {
        res
          .status(response.statusCode)
          .json(FailureResponse.ValidationFailure(result as IValidationData[]));
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

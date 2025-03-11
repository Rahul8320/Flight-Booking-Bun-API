import type { Request, Response } from "express";
import type { Airport } from "@prisma/client";
import { logger } from "../config";
import { StatusCodes } from "../models";
import { AirportService } from "../services";
import {
  FailureResponse,
  handleResponse,
  SuccessResponse,
  type IValidationData,
} from "../utils";

export class AirportController {
  private _airportService: AirportService;

  constructor() {
    this._airportService = new AirportService();
    this.createAirport = this.createAirport.bind(this);
    this.getAirports = this.getAirports.bind(this);
    this.getAirport = this.getAirport.bind(this);
    this.deleteAirport = this.deleteAirport.bind(this);
  }

  /**
   * @description Create a new airport
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns newly created airport
   */
  async createAirport(req: Request, res: Response): Promise<void> {
    try {
      const { name, code, address, cityName } = req.body;

      const response = await this._airportService.createAirport({
        name,
        code,
        address,
        cityName,
      });

      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.CREATED) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Created(result as Airport));

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
   * @description Fetched all airports
   * @param {Request} _req - The request object
   * @param {Response} res - The response object
   * @returns All airports
   */
  async getAirports(_req: Request, res: Response): Promise<void> {
    try {
      const response = await this._airportService.getAirports();

      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Fetched(result as Airport[]));

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
   * @description Get an airport by id
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns Airport with given id
   */
  async getAirport(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const intID = parseInt(id);

      const response = await this._airportService.getAirport(intID);

      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Fetched(result as Airport));

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
   * @description Delete an airport by id
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns Deleted Airport
   */
  async deleteAirport(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const intID = parseInt(id);

      const response = await this._airportService.deleteAirport(intID);

      const result = handleResponse(response);

      if (response.statusCode === StatusCodes.OK) {
        res
          .status(response.statusCode)
          .json(SuccessResponse.Deleted(result as Airport));

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

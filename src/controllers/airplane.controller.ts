import { logger } from "../config";
import { StatusCodes } from "../models";
import { AirplaneService } from "../services";
import type { Request, Response } from "express";
import { FailureResponse, SuccessResponse } from "../utils";

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

      const airplane = await this._airplaneService.createAirplane({
        modelNumber,
        capacity,
      });

      res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse.airplaneCreated(airplane));

      return;
    } catch (err: any) {
      logger.error(err.message || "Something wrong happened!", err);

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          FailureResponse.serverError(
            err.message || "Something wrong happened!"
          )
        );

      return;
    }
  }
}

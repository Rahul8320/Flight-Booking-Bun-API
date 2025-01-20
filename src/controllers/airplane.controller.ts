import { logger } from "../config";
import { StatusCodes } from "../models";
import { AirplaneService } from "../services";
import type { Request, Response } from "express";

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

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Airplane created successfully",
        data: airplane,
        error: null,
      });

      return;
    } catch (err: any) {
      logger.error(err.message || "Something wrong happened!", err);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something wrong happened!",
        data: null,
        error: err.message || "Please try again later!",
      });

      return;
    }
  }
}

import { logger } from "../config";
import { StatusCodes } from "../models/statusCodes";
import { AirplaneService } from "../services";
import type { Request, Response } from "express";

export class AirplaneController {
  private _airplaneService;

  constructor() {
    this._airplaneService = new AirplaneService();
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
    } catch (err) {
      logger.error("Something wrong happend!", err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something wrong happend!",
        data: null,
        error: err,
      });
    }
  }
}

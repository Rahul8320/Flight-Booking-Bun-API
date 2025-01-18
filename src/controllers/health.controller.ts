import type { Request, Response } from "express";
import { StatusCodes } from "../models/statusCodes";
import { logger } from "../configs";

class HealthController {
  public getHealth(_req: Request, res: Response) {
    logger.info("Api is healthy");
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Api is healthy",
      data: {},
      error: null,
    });
  }
}

export default HealthController;

import type { Request, Response } from "express";
import { StatusCodes } from "../models";
import { logger } from "../config";

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

import type { Request, Response } from "express";
import { StatusCodes } from "../models";
import { logger } from "../config";
import { SuccessResponse } from "../utils";

class HealthController {
  public getHealth(_req: Request, res: Response) {
    logger.info("Api is healthy");
    res.status(StatusCodes.OK).json(SuccessResponse.healthCheck());
  }
}

export default HealthController;

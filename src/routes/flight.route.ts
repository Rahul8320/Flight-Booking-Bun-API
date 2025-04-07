import { Router } from "express";
import { FlightController } from "../controllers";
import { validateRequest } from "../middlewares";
import { createFlightSchema } from "../models";

const router = Router();

const flightController = new FlightController();

router.post(
  "/",
  validateRequest(createFlightSchema),
  flightController.createFlight
);

export default router;

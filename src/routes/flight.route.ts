import { Router } from "express";
import { FlightController } from "../controllers";

const router = Router();

const flightController = new FlightController();

router.post("/", flightController.createFlight);

export default router;

import { Router } from "express";
import { AirplaneController } from "../controllers";
import { validateCreateAirplane } from "../middlewares";

const router = Router();

const airplaneController = new AirplaneController();

router.post("/", validateCreateAirplane, airplaneController.createAirplane);

export default router;

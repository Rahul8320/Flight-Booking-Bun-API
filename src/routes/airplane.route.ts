import { Router } from "express";
import { AirplaneController } from "../controllers";
import { validateAirplaneId, validateCreateAirplane } from "../middlewares";

const router = Router();

const airplaneController = new AirplaneController();

router.post("/", validateCreateAirplane, airplaneController.createAirplane);
router.get("/", airplaneController.getAirplanes);
router.get("/:id", validateAirplaneId, airplaneController.getAirplane);

export default router;

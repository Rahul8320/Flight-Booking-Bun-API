import { Router } from "express";
import { AirplaneController } from "../controllers";
import {
  validateAirplaneId,
  validateCreateAirplane,
  validateUpdateAirplane,
} from "../middlewares";

const router = Router();

const airplaneController = new AirplaneController();

router.post("/", validateCreateAirplane, airplaneController.createAirplane);
router.get("/", airplaneController.getAirplanes);
router.get("/:id", validateAirplaneId, airplaneController.getAirplane);
router.put("/:id", validateUpdateAirplane, airplaneController.updateAirplane);
router.delete("/:id", validateAirplaneId, airplaneController.deleteAirplane);

export default router;

import { Router } from "express";
import { AirplaneController } from "../controllers";

const router = Router();

const airplaneController = new AirplaneController();

router.post("/", airplaneController.createAirplane);

export default router;

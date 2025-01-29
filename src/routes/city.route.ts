import { Router } from "express";
import { CityController } from "../controllers";
import { validateCreateCity } from "../middlewares";

const router = Router();
const cityController = new CityController();

router.post("/", validateCreateCity, cityController.createCity);

export default router;

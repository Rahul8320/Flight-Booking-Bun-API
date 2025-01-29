import { Router } from "express";
import { CityController } from "../controllers";
import { validateCityId, validateCreateCity } from "../middlewares";

const router = Router();
const cityController = new CityController();

router.post("/", validateCreateCity, cityController.createCity);
router.get("/", cityController.getCities);
router.get("/:id", validateCityId, cityController.getCity);
router.delete("/:id", validateCityId, cityController.deleteCity);

export default router;

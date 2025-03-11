import { Router } from "express";
import { AirportController } from "../controllers";
import { validateAirportId, validateCreateAirport } from "../middlewares";

const router = Router();

const airportController = new AirportController();

router.post("/", validateCreateAirport, airportController.createAirport);
router.get("/", airportController.getAirports);
router.get("/:id", validateAirportId, airportController.getAirport);
router.delete("/:id", validateAirportId, airportController.deleteAirport);

export default router;

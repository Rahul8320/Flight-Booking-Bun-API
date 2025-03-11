import { Router } from "express";
import { AirportController } from "../controllers";

const router = Router();

const airportController = new AirportController();

router.post("/", airportController.createAirport);
router.get("/", airportController.getAirports);
router.get("/:id", airportController.getAirport);
router.delete("/:id", airportController.deleteAirport);

export default router;

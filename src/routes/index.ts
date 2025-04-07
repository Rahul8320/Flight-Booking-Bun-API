import airplaneRoutes from "./airplane.route";
import healthRoutes from "./health.route";
import cityRoutes from "./city.route";
import airportRoutes from "./airport.route";
import flightRoutes from "./flight.route";
import { Router } from "express";

const router = Router();

router.use("/health", healthRoutes);
router.use("/airplane", airplaneRoutes);
router.use("/city", cityRoutes);
router.use("/airport", airportRoutes);
router.use("/flight", flightRoutes);

export default router;

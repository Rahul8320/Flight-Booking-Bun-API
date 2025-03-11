import airplaneRoute from "./airplane.route";
import healthRoute from "./health.route";
import cityRoute from "./city.route";
import airportRoute from "./airport.route";
import { Router } from "express";

const router = Router();

router.use("/health", healthRoute);
router.use("/airplane", airplaneRoute);
router.use("/city", cityRoute);
router.use("/airport", airportRoute);

export default router;

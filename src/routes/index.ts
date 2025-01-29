import airplaneRoute from "./airplane.route";
import healthRoute from "./health.route";
import cityRoute from "./city.route";
import { Router } from "express";

const router = Router();

router.use("/health", healthRoute);
router.use("/airplane", airplaneRoute);
router.use("/city", cityRoute);

export default router;

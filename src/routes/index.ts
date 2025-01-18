import airplaneRoute from "./airplane.route";
import healthRoute from "./health.route";
import { Router } from "express";

const router = Router();

router.use("/health", healthRoute);
router.use("/airplane", airplaneRoute);

export default router;

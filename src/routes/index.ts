import healthRoute from "./health.route";
import { Router } from "express";

const router = Router();

router.use("/health", healthRoute);

export default router;

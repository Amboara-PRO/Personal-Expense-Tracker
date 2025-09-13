import { Router } from "express";
import { getMonthlySummary } from "../controller/dashboard.controller.js";

const router = Router();

// ex: GET /api/dashboard/summary/1?start=2025-01-01&end=2025-01-31
router.get("/summary/:userId", getMonthlySummary);

export default router;

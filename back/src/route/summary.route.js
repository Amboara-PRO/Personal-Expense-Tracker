const express = require("express");
const router = express.Router();
const SummaryController = require("../controller/summary.controller");
const authMiddleware = require("../middleware/auth.middleware"); //verify jwt

router.get('/monthly', authMiddleware, SummaryController.getMonthlySummary); // ==> mois
router.get('/', authMiddleware, SummaryController.getOverallSummary); // ==> entre deux dates
router.get('/alerts', authMiddleware, SummaryController.getAlerts); // ==> alertes


module.exports = router;

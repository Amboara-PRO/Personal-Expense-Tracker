import { Router } from "express";
import {
  createExpense,
  getUserExpenses,
  updateExpense,
  deleteExpense,
  uploadReceiptForExpense,
  upload,
} from "../controller/expense.controller.js";

const router = Router();

router.post("/", createExpense);
router.get("/user/:userId", getUserExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

router.post("/:id/receipt", upload.single("receipt"), uploadReceiptForExpense);

export default router;

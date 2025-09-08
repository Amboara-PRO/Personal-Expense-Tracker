import { Router } from "express";
import { createExpense, getUserExpenses, updateExpense, deleteExpense } from "../controller/expense.controller.js";

const router = Router();

router.post("/", createExpense);
router.get("/user/:userId", getUserExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;

import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), "receipts");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir); 
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `receipt-${uniqueSuffix}${ext}`);
  },
});
export const upload = multer({ storage });

export const createExpense = async (req, res) => {
  try {
    const { amount, description, category, type, date, startDate, endDate, userId } =
      req.body;

    if (!amount || !userId || !type)
      return res.status(400).json({ error: "Missing required fields" });

    if (type === "ONE_TIME" && !date)
      return res.status(400).json({ error: "Date is required for ONE_TIME" });

    if (type === "RECURRING" && !startDate)
      return res.status(400).json({ error: "Start date is required for RECURRING" });

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        description: description || "",
        category: category || "",
        type,
        userId: Number(userId),
        date: type === "ONE_TIME" ? new Date(date) : null,
        startDate: type === "RECURRING" ? new Date(startDate) : null,
        endDate: type === "RECURRING" && endDate ? new Date(endDate) : null,
      },
      include: { receipt: true },
    });

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getUserExpenses = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ error: "Invalid userId" });

    const expenses = await prisma.expense.findMany({
      where: { userId },
      include: { receipt: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid expense ID" });

    const { amount, description, category, type, date, startDate, endDate } = req.body;

    if (type === "ONE_TIME" && !date)
      return res.status(400).json({ error: "Date is required for ONE_TIME" });

    if (type === "RECURRING" && !startDate)
      return res.status(400).json({ error: "Start date is required for RECURRING" });

    const expense = await prisma.expense.update({
      where: { id },
      data: {
        amount: parseFloat(amount),
        description: description || "",
        category: category || "",
        type,
        date: type === "ONE_TIME" ? new Date(date) : null,
        startDate: type === "RECURRING" ? new Date(startDate) : null,
        endDate: type === "RECURRING" && endDate ? new Date(endDate) : null,
      },
      include: { receipt: true },
    });

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid expense ID" });

    const existingReceipt = await prisma.receipt.findUnique({ where: { expenseId: id } });
    if (existingReceipt) {
      const filePath = path.join(process.cwd(), "receipts", existingReceipt.filePath);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await prisma.receipt.delete({ where: { expenseId: id } });
    }

    await prisma.expense.delete({ where: { id } });
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const uploadReceiptForExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid expense ID" });

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const existing = await prisma.receipt.findUnique({ where: { expenseId: id } });
    if (existing) {
      const oldPath = path.join(process.cwd(), "receipts", existing.filePath);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      const updated = await prisma.receipt.update({
        where: { expenseId: id },
        data: { filePath: req.file.filename },
      });
      return res.json(updated);
    }

    const receipt = await prisma.receipt.create({
      data: { expenseId: id, filePath: req.file.filename },
    });

    res.json(receipt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

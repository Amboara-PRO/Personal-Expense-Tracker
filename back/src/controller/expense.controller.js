import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createExpense = async (req, res) => {
  try {
    const {
      amount,
      description,
      category,
      type,
      date,
      startDate,
      endDate,
      userId,
    } = req.body;

    if (type === "ONE_TIME" && !date) {
      return res
        .status(400)
        .json({ error: "The date is required for ONE_TIME" });
    }
    if (type === "RECURRING" && !startDate) {
      return res
        .status(400)
        .json({ error: "The startDate is required for RECURRING" });
    }

    const expense = await prisma.expense.create({
      data: {
        amount,
        description: description || "",
        category: category || "",
        type,
        date: type === "ONE_TIME" ? new Date(date) : null,
        startDate: type === "RECURRING" ? new Date(startDate) : null,
        endDate: type === "RECURRING" && endDate ? new Date(endDate) : null,
        userId,
      },
    });

    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Error creating the expense" });
  }
};

export const getUserExpenses = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ error: "userId invalid" });

    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { amount, description, category, type, date, startDate, endDate } =
      req.body;

    if (isNaN(id)) return res.status(400).json({ error: "ID invalid" });
    if (type === "ONE_TIME" && !date) {
      return res
        .status(400)
        .json({ error: "The date is required fo ONE_TIME" });
    }
    if (type === "RECURRING" && !startDate) {
      return res
        .status(400)
        .json({ error: "The startDate is required for RECURRING" });
    }

    const expense = await prisma.expense.update({
      where: { id },
      data: {
        amount,
        description: description || "",
        category: category || "",
        type,
        date: type === "ONE_TIME" ? new Date(date) : null,
        startDate: type === "RECURRING" ? new Date(startDate) : null,
        endDate: type === "RECURRING" && endDate ? new Date(endDate) : null,
      },
    });

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalid" });

    await prisma.expense.delete({ where: { id } });
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting" });
  }
};

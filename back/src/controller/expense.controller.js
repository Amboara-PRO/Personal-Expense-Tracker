import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createExpense = async (req, res) => {
  try {
    const { title, amount, userId } = req.body;
    const expense = await prisma.expense.create({
      data: { title, amount, userId },
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création de la dépense" });
  }
};

export const getUserExpenses = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des dépenses" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, amount } = req.body;
    const expense = await prisma.expense.update({
      where: { id },
      data: { title, amount },
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.expense.delete({ where: { id } });
    res.json({ message: "Dépense supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};

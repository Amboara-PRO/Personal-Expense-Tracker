import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMonthlySummary = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) return res.status(400).json({ error: "userId invalid" });

    const { start, end } = req.query;

    const startDate = start
      ? new Date(start)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endDate = end
      ? new Date(end)
      : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // 🔹 Récupère les dépenses de l’utilisateur
    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        OR: [
          { type: "ONE_TIME", date: { gte: startDate, lte: endDate } },
          {
            type: "RECURRING",
            startDate: { lte: endDate },
            OR: [{ endDate: null }, { endDate: { gte: startDate } }],
          },
        ],
      },
    });

    // 🔹 Totaux
    const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
    const totalIncome = 0; // pas de table income
    const balance = -totalExpenses;

    // 🔹 Catégories
    const expenseByCategory = expenses.reduce((acc, e) => {
      acc[e.category || "Other"] = (acc[e.category || "Other"] || 0) + e.amount;
      return acc;
    }, {});

    // 🔹 Dépenses par mois
    const monthlySpending = {};
    expenses.forEach((e) => {
      const date = e.date || e.startDate;
      if (!date) return;
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthlySpending[monthKey] =
        (monthlySpending[monthKey] || 0) + e.amount;
    });

    res.json({
      totalIncome,
      totalExpenses,
      balance,
      expenseByCategory,
      monthlySpending,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating monthly summary" });
  }
};

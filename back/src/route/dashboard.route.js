// filepath: /home/saviola-24/Bosy/WEB2/Personal-Expense-Tracker/back/src/route/dashboard.route.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer les statistiques du tableau de bord
router.get('/', async (req, res) => {
  try {
    const stats = await prisma.dashboardStats.findMany();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
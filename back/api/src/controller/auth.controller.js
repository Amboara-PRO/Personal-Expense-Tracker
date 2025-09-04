import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logInUser = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

export const createUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, password },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
};

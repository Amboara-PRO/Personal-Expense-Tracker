import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {name:true,email: true,creationDate:true }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
    } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateProfile = async (req, res) => {
    const {password, name} = req.body;
    try {
        const updatedData = {};
        if(password.length > 100){
    return res.status(400).json({ error: "Password too long" });
  }
        if (password) {
            const bcrypt = await import('bcryptjs');
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }
        if (name) updatedData.name = name;
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: updatedData,
            select: { id: true,name:true}
        });
        res.status(200).json({ message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const deleteProfile = async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: req.user.id } });
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
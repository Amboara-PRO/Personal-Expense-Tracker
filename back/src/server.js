import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoute from "./route/auth.route.js";
import profileRoute from "./route/profile.route.js";
import expenseRoute from "./route/expense.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/receipts", express.static(path.join(process.cwd(), "receipts")));

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/expenses", expenseRoute);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

console.log("Database URL:", process.env.DATABASE_URL);
console.log("JWT Secret:", process.env.JWT_SECRET);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

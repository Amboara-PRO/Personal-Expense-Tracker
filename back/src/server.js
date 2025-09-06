import express from 'express';
import cors from 'cors';
import authRoute from './route/auth.route.js';
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);

import dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

console.log("Database URL:", dbUrl);
console.log("JWT Secret:", jwtSecret);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

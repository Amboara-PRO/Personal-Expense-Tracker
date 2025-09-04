import express from 'express';
import cors from 'cors';
import authRoute from './route/auth.route.js';
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoute);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

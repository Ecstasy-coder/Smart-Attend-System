import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'SmartAttend Pro Module 1 API', version: '1.0.0' });
});

await connectDB();

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

// backend/app.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import listRoutes from './routes/listRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);

export default app;

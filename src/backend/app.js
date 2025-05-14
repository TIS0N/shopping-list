// backend/app.js
import express from 'express';
import cors from 'cors';
import listRoutes from './routes/listRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/lists', listRoutes);

export default app;

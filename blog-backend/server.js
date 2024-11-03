import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: '*',  // Allow this specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  credentials: true  // Enable cookies and credentials (if needed)
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/', postRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

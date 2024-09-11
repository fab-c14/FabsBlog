import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import upload from './middleware/upload.js';
import cors from 'cors';

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

// Routes
app.use('/api/auth', authRoutes);

// Upload route for images
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

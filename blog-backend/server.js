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
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);

// Upload route for images
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

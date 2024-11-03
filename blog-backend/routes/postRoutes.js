// postRoutes.js
import express from 'express';
import multer from 'multer';
import { createPost } from '../controllers/postController.js';
import { getPosts } from '../controllers/postController.js';
const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });


router.get('/posts', getPosts);

// Existing route for creating a post
router.post('/posts', upload.single('image'), createPost);

export default router;

import express from 'express';
import { register, login } from '../controllers/authController.js';
import { getProfile } from '../controllers/profileController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

// @route POST /api/auth/register
router.post('/register', register);

// @route POST /api/auth/login
router.post('/login', login);



// Route for getting profile details (requires authentication)
router.get('/profile', authenticateToken, getProfile);
export default router;


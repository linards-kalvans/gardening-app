import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Google OAuth routes
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

// Facebook OAuth routes
router.get('/facebook', authController.facebookAuth);
router.get('/facebook/callback', authController.facebookCallback);

// Logout route
router.post('/logout', authController.logout);

// Get current user (protected)
router.get('/me', authenticateToken, authController.getCurrentUser);

export default router;

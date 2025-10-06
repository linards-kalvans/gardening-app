import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { User } from '../types';

const router = Router();

// Protected routes
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.delete('/account', authenticateToken, userController.deleteAccount);

export default router;

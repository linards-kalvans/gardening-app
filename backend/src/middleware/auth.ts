import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access token required'
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret', (err, decoded) => {
    if (err) {
      res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
      return;
    }

    const payload = decoded as JWTPayload;
    (req as any).user = {
      id: payload.userId,
      email: payload.email,
      name: '', // Will be populated from database
      provider: '' // Will be populated from database
    };
    next();
  });
};

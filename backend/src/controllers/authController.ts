import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User, JWTPayload } from '../types';

export const authController = {
  // Google OAuth authentication
  googleAuth: (req: Request, res: Response, next: NextFunction) => {
    const handler = passport.authenticate('google', { scope: ['profile', 'email'] });
    handler(req, res, next);
  },

  // Google OAuth callback
  googleCallback: (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('google', (err: any, user: User) => {
      if (err) {
        res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        return;
      }
      if (!user) {
        res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-jwt-secret',
        { expiresIn: '24h' }
      );

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
    })(req, res, next);
  },

  // Facebook OAuth authentication
  facebookAuth: (req: Request, res: Response, next: NextFunction) => {
    const handler = passport.authenticate('facebook', { scope: ['email'] });
    handler(req, res, next);
  },

  // Facebook OAuth callback
  facebookCallback: (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('facebook', (err: any, user: User) => {
      if (err) {
        res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        return;
      }
      if (!user) {
        res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user`);
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-jwt-secret',
        { expiresIn: '24h' }
      );

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
    })(req, res, next);
  },

  // Logout
  logout: (req: Request, res: Response): void => {
    req.logout((err) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'Logout failed'
        });
        return;
      }
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'Session destruction failed'
          });
          return;
        }
        res.clearCookie('connect.sid');
        res.json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    });
  },

  // Get current user
  getCurrentUser: (req: Request, res: Response): void => {
    if (req.user) {
      res.json({
        success: true,
        user: req.user
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }
  }
};

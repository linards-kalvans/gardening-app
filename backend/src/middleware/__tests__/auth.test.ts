import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../auth';
import jwt from 'jsonwebtoken';

// Mock Express request and response
const mockRequest = (authHeader?: string) => ({
  headers: {
    authorization: authHeader
  }
}) as Request;

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn() as NextFunction;

describe('authenticateToken Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-jwt-secret';
  });

  describe('Valid Token', () => {
    it('should authenticate user with valid token', () => {
      const token = jwt.sign(
        { userId: 'user123', email: 'test@example.com' },
        'test-jwt-secret',
        { expiresIn: '1h' }
      );

      const req = mockRequest(`Bearer ${token}`);
      const res = mockResponse();
      const next = mockNext;

      authenticateToken(req, res, next);

      expect(req.user).toBeDefined();
      expect(req.user?.id).toBe('user123');
      expect(req.user?.email).toBe('test@example.com');
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('Invalid Token', () => {
    it('should return 401 when no token provided', () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext;

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access token required'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when no authorization header', () => {
      const req = mockRequest(undefined);
      const res = mockResponse();
      const next = mockNext;

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access token required'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when token is invalid', () => {
      const req = mockRequest('Bearer invalid-token');
      const res = mockResponse();
      const next = mockNext;

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid or expired token'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when token is expired', () => {
      const expiredToken = jwt.sign(
        { userId: 'user123', email: 'test@example.com' },
        'test-jwt-secret',
        { expiresIn: '-1h' } // Expired token
      );

      const req = mockRequest(`Bearer ${expiredToken}`);
      const res = mockResponse();
      const next = mockNext;

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid or expired token'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when token has wrong secret', () => {
      const wrongSecretToken = jwt.sign(
        { userId: 'user123', email: 'test@example.com' },
        'wrong-secret',
        { expiresIn: '1h' }
      );

      const req = mockRequest(`Bearer ${wrongSecretToken}`);
      const res = mockResponse();
      const next = mockNext;

      authenticateToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid or expired token'
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Token Format', () => {
    it('should handle Bearer token format correctly', () => {
      const token = jwt.sign(
        { userId: 'user123', email: 'test@example.com' },
        'test-jwt-secret',
        { expiresIn: '1h' }
      );

      const req = mockRequest(`Bearer ${token}`);
      const res = mockResponse();
      const next = mockNext;

      authenticateToken(req, res, next);

      expect(req.user).toBeDefined();
      expect(next).toHaveBeenCalled();
    });

    it('should handle token without Bearer prefix', () => {
      const token = jwt.sign(
        { userId: 'user123', email: 'test@example.com' },
        'test-jwt-secret',
        { expiresIn: '1h' }
      );

      const req = mockRequest(token);
      const res = mockResponse();
      const next = mockNext;

      authenticateToken(req, res, next);

      expect(req.user).toBeDefined();
      expect(next).toHaveBeenCalled();
    });
  });
});

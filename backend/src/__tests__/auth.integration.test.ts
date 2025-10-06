import request from 'supertest';
import app from '../app';
import { testPool } from '../tests/setup';

describe('Authentication API Integration Tests', () => {
  beforeEach(async () => {
    // Clean up test data
    await testPool.query('DELETE FROM user_sessions');
    await testPool.query('DELETE FROM user_preferences');
    await testPool.query('DELETE FROM users');
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('environment', 'test');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Not authenticated');
    });

    it('should return user info when authenticated', async () => {
      // Create a test user
      const userResult = await testPool.query(`
        INSERT INTO users (email, name, provider, google_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, ['test@example.com', 'Test User', 'google', 'google_123']);

      const user = userResult.rows[0];

      // Mock authentication by setting user in request
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('user');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Logged out successfully');
    });
  });

  describe('OAuth Routes', () => {
    it('should redirect to Google OAuth', async () => {
      const response = await request(app)
        .get('/api/auth/google')
        .expect(302);

      expect(response.headers.location).toContain('accounts.google.com');
    });

    it('should redirect to Facebook OAuth', async () => {
      const response = await request(app)
        .get('/api/auth/facebook')
        .expect(302);

      expect(response.headers.location).toContain('facebook.com');
    });
  });
});

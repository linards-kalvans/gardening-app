import request from 'supertest';
import app from '../app';
import { testPool } from '../tests/setup';
import jwt from 'jsonwebtoken';

describe('User API Integration Tests', () => {
  let authToken: string;
  let userId: string;

  beforeEach(async () => {
    // Clean up test data
    await testPool.query('DELETE FROM user_sessions');
    await testPool.query('DELETE FROM user_preferences');
    await testPool.query('DELETE FROM users');

    // Create test user
    const userResult = await testPool.query(`
      INSERT INTO users (email, name, provider, google_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, ['test@example.com', 'Test User', 'google', 'google_123']);

    const user = userResult.rows[0];
    userId = user.id;

    // Create auth token
    authToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/user/profile', () => {
    it('should return user profile when authenticated', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id', userId);
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).toHaveProperty('name', 'Test User');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Access token required');
    });

    it('should return 403 with invalid token', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(403);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Invalid or expired token');
    });
  });

  describe('PUT /api/user/profile', () => {
    it('should update user profile when authenticated', async () => {
      const updateData = {
        name: 'Updated Name',
        preferences: {
          timezone: 'Europe/London',
          language: 'en'
        }
      };

      const response = await request(app)
        .put('/api/user/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Profile updated successfully');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('name', 'Updated Name');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .put('/api/user/profile')
        .send({ name: 'New Name' })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('DELETE /api/user/account', () => {
    it('should delete user account when authenticated', async () => {
      const response = await request(app)
        .delete('/api/user/account')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Account deleted successfully');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .delete('/api/user/account')
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});

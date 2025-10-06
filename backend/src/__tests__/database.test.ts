import { testConnection, closeConnection } from '../config/database/connection';
import { testPool } from '../tests/setup';

describe('Database Connection Tests', () => {
  describe('testConnection', () => {
    it('should connect to test database successfully', async () => {
      // Test the test database connection directly
      const result = await testPool.query('SELECT NOW()');
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].now).toBeDefined();
    });
  });

  describe('Database Operations', () => {
    it('should create and query users table', async () => {
      // Insert test user
      const insertResult = await testPool.query(`
        INSERT INTO users (email, name, provider, google_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, ['dbtest@example.com', 'DB Test User', 'google', 'google_dbtest']);

      expect(insertResult.rows).toHaveLength(1);
      expect(insertResult.rows[0].email).toBe('dbtest@example.com');

      // Query user
      const selectResult = await testPool.query(`
        SELECT * FROM users WHERE email = $1
      `, ['dbtest@example.com']);

      expect(selectResult.rows).toHaveLength(1);
      expect(selectResult.rows[0].name).toBe('DB Test User');
    });

    it('should handle foreign key constraints', async () => {
      // Insert user first
      const userResult = await testPool.query(`
        INSERT INTO users (email, name, provider, google_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `, ['fk@example.com', 'FK Test User', 'google', 'google_fk']);

      const userId = userResult.rows[0].id;

      // Insert user preferences (should work)
      const prefsResult = await testPool.query(`
        INSERT INTO user_preferences (user_id, timezone, language, units)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [userId, 'UTC', 'en', 'metric']);

      expect(prefsResult.rows).toHaveLength(1);
      expect(prefsResult.rows[0].user_id).toBe(userId);

      // Try to insert preferences for non-existent user (should fail)
      await expect(
        testPool.query(`
          INSERT INTO user_preferences (user_id, timezone, language, units)
          VALUES ($1, $2, $3, $4)
        `, ['non-existent-id', 'UTC', 'en', 'metric'])
      ).rejects.toThrow();
    });

    it('should handle unique constraints', async () => {
      // Insert first user
      await testPool.query(`
        INSERT INTO users (email, name, provider, google_id)
        VALUES ($1, $2, $3, $4)
      `, ['unique@example.com', 'Unique User', 'google', 'google_unique']);

      // Try to insert user with same email (should fail)
      await expect(
        testPool.query(`
          INSERT INTO users (email, name, provider, google_id)
          VALUES ($1, $2, $3, $4)
        `, ['unique@example.com', 'Another User', 'facebook', 'facebook_unique'])
      ).rejects.toThrow();
    });

    it('should handle cascade deletes', async () => {
      // Insert user
      const userResult = await testPool.query(`
        INSERT INTO users (email, name, provider, google_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `, ['cascade@example.com', 'Cascade User', 'google', 'google_cascade']);

      const userId = userResult.rows[0].id;

      // Insert user preferences
      await testPool.query(`
        INSERT INTO user_preferences (user_id, timezone, language, units)
        VALUES ($1, $2, $3, $4)
      `, [userId, 'UTC', 'en', 'metric']);

      // Insert user session
      await testPool.query(`
        INSERT INTO user_sessions (user_id, session_token, expires_at)
        VALUES ($1, $2, $3)
      `, [userId, 'test-session-token', new Date(Date.now() + 3600000)]);

      // Verify data exists
      const prefsCount = await testPool.query(`
        SELECT COUNT(*) FROM user_preferences WHERE user_id = $1
      `, [userId]);
      expect(parseInt(prefsCount.rows[0].count)).toBe(1);

      const sessionsCount = await testPool.query(`
        SELECT COUNT(*) FROM user_sessions WHERE user_id = $1
      `, [userId]);
      expect(parseInt(sessionsCount.rows[0].count)).toBe(1);

      // Delete user (should cascade delete preferences and sessions)
      await testPool.query('DELETE FROM users WHERE id = $1', [userId]);

      // Verify cascade delete worked
      const prefsCountAfter = await testPool.query(`
        SELECT COUNT(*) FROM user_preferences WHERE user_id = $1
      `, [userId]);
      expect(parseInt(prefsCountAfter.rows[0].count)).toBe(0);

      const sessionsCountAfter = await testPool.query(`
        SELECT COUNT(*) FROM user_sessions WHERE user_id = $1
      `, [userId]);
      expect(parseInt(sessionsCountAfter.rows[0].count)).toBe(0);
    });
  });

  describe('Database Indexes', () => {
    it('should have proper indexes for performance', async () => {
      // Check if indexes exist
      const indexQuery = `
        SELECT indexname, tablename 
        FROM pg_indexes 
        WHERE tablename IN ('users', 'user_sessions', 'user_preferences')
        ORDER BY tablename, indexname
      `;

      const result = await testPool.query(indexQuery);
      const indexes = result.rows;

      // Check for expected indexes
      const indexNames = indexes.map(row => row.indexname);
      
      expect(indexNames).toContain('idx_users_email');
      expect(indexNames).toContain('idx_users_google_id');
      expect(indexNames).toContain('idx_user_sessions_user_id');
      expect(indexNames).toContain('idx_user_preferences_user_id');
    });
  });
});

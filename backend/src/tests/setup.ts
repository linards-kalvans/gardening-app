import { Pool } from 'pg';

// Test database configuration
const testDbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'gardening_app_test',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create test database connection
export const testPool = new Pool(testDbConfig);

// Global test setup
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret';
  process.env.SESSION_SECRET = 'test-session-secret';
  
  // Test database connection
  try {
    await testPool.query('SELECT NOW()');
    console.log('✅ Test database connected');
  } catch (error) {
    console.error('❌ Test database connection failed:', error);
    throw error;
  }
});

// Clean up after all tests
afterAll(async () => {
  await testPool.end();
});

// Clean up after each test
afterEach(async () => {
  // Clean up test data in correct order (respecting foreign keys)
  await testPool.query('DELETE FROM user_sessions');
  await testPool.query('DELETE FROM user_preferences');
  await testPool.query('DELETE FROM users');
});

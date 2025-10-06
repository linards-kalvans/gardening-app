import { UserService } from '../userService';
import { testPool } from '../../tests/setup';

describe('UserService', () => {
  beforeEach(async () => {
    // Clean up test data before each test
    await testPool.query('DELETE FROM user_sessions');
    await testPool.query('DELETE FROM user_preferences');
    await testPool.query('DELETE FROM users');
  });

  describe('createUser', () => {
    it('should create a new user with Google OAuth', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        provider: 'google',
        googleId: 'google_123456789',
        profilePictureUrl: 'https://example.com/photo.jpg'
      };

      const user = await UserService.createUser(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
      expect(user.provider).toBe(userData.provider);
      expect(user.googleId).toBe(userData.googleId);
      expect(user.profilePictureUrl).toBe(userData.profilePictureUrl);
      expect(user.id).toBeDefined();
    });

    it('should create a new user with Facebook OAuth', async () => {
      const userData = {
        email: 'demo@example.com',
        name: 'Demo User',
        provider: 'facebook',
        facebookId: 'facebook_987654321'
      };

      const user = await UserService.createUser(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
      expect(user.provider).toBe(userData.provider);
      expect(user.facebookId).toBe(userData.facebookId);
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        name: 'First User',
        provider: 'google'
      };

      // Create first user
      await UserService.createUser(userData);

      // Try to create second user with same email
      const duplicateUserData = {
        email: 'duplicate@example.com',
        name: 'Second User',
        provider: 'facebook'
      };

      await expect(UserService.createUser(duplicateUserData)).rejects.toThrow();
    });
  });

  describe('findByEmail', () => {
    beforeEach(async () => {
      // Create test user
      await UserService.createUser({
        email: 'findme@example.com',
        name: 'Find Me User',
        provider: 'google',
        googleId: 'google_findme'
      });
    });

    it('should find user by email', async () => {
      const user = await UserService.findByEmail('findme@example.com');

      expect(user).toBeDefined();
      expect(user?.email).toBe('findme@example.com');
      expect(user?.name).toBe('Find Me User');
    });

    it('should return null for non-existent email', async () => {
      const user = await UserService.findByEmail('nonexistent@example.com');

      expect(user).toBeNull();
    });
  });

  describe('findByGoogleId', () => {
    beforeEach(async () => {
      await UserService.createUser({
        email: 'google@example.com',
        name: 'Google User',
        provider: 'google',
        googleId: 'google_unique_123'
      });
    });

    it('should find user by Google ID', async () => {
      const user = await UserService.findByGoogleId('google_unique_123');

      expect(user).toBeDefined();
      expect(user?.googleId).toBe('google_unique_123');
      expect(user?.email).toBe('google@example.com');
    });

    it('should return null for non-existent Google ID', async () => {
      const user = await UserService.findByGoogleId('nonexistent_google_id');

      expect(user).toBeNull();
    });
  });

  describe('findByFacebookId', () => {
    beforeEach(async () => {
      await UserService.createUser({
        email: 'facebook@example.com',
        name: 'Facebook User',
        provider: 'facebook',
        facebookId: 'facebook_unique_456'
      });
    });

    it('should find user by Facebook ID', async () => {
      const user = await UserService.findByFacebookId('facebook_unique_456');

      expect(user).toBeDefined();
      expect(user?.facebookId).toBe('facebook_unique_456');
      expect(user?.email).toBe('facebook@example.com');
    });

    it('should return null for non-existent Facebook ID', async () => {
      const user = await UserService.findByFacebookId('nonexistent_facebook_id');

      expect(user).toBeNull();
    });
  });

  describe('updateUser', () => {
    let userId: string;

    beforeEach(async () => {
      const user = await UserService.createUser({
        email: 'update@example.com',
        name: 'Original Name',
        provider: 'google'
      });
      userId = user.id;
    });

    it('should update user name', async () => {
      const updatedUser = await UserService.updateUser(userId, {
        name: 'Updated Name'
      });

      expect(updatedUser).toBeDefined();
      expect(updatedUser?.name).toBe('Updated Name');
      expect(updatedUser?.email).toBe('update@example.com');
    });

    it('should update user profile picture', async () => {
      const updatedUser = await UserService.updateUser(userId, {
        profilePictureUrl: 'https://newphoto.com/image.jpg'
      });

      expect(updatedUser).toBeDefined();
      expect(updatedUser?.profilePictureUrl).toBe('https://newphoto.com/image.jpg');
    });

    it('should return null for non-existent user', async () => {
      const updatedUser = await UserService.updateUser('non-existent-id', {
        name: 'New Name'
      });

      expect(updatedUser).toBeNull();
    });
  });

  describe('deleteUser', () => {
    let userId: string;

    beforeEach(async () => {
      const user = await UserService.createUser({
        email: 'delete@example.com',
        name: 'Delete Me',
        provider: 'google'
      });
      userId = user.id;
    });

    it('should delete user successfully', async () => {
      const result = await UserService.deleteUser(userId);

      expect(result).toBe(true);

      // Verify user is deleted
      const deletedUser = await UserService.findByEmail('delete@example.com');
      expect(deletedUser).toBeNull();
    });

    it('should return false for non-existent user', async () => {
      const result = await UserService.deleteUser('non-existent-id');

      expect(result).toBe(false);
    });
  });

  describe('getUserWithPreferences', () => {
    let userId: string;

    beforeEach(async () => {
      const user = await UserService.createUser({
        email: 'preferences@example.com',
        name: 'Preferences User',
        provider: 'google'
      });
      userId = user.id;

      // Create user preferences
      await testPool.query(`
        INSERT INTO user_preferences (user_id, timezone, language, units)
        VALUES ($1, 'Europe/London', 'en', 'metric')
      `, [userId]);
    });

    it('should get user with preferences', async () => {
      const userWithPrefs = await UserService.getUserWithPreferences(userId);

      expect(userWithPrefs).toBeDefined();
      expect(userWithPrefs.email).toBe('preferences@example.com');
      expect(userWithPrefs.timezone).toBe('Europe/London');
      expect(userWithPrefs.language).toBe('en');
      expect(userWithPrefs.units).toBe('metric');
    });

    it('should return null for non-existent user', async () => {
      const userWithPrefs = await UserService.getUserWithPreferences('non-existent-id');

      expect(userWithPrefs).toBeNull();
    });
  });
});

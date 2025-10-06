import { pool } from '../config/database/connection';
import { User } from '../types';

function mapDbUser(row: any): User {
  if (!row) return row;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    provider: row.provider,
    googleId: row.google_id ?? row.googleId,
    facebookId: row.facebook_id ?? row.facebookId,
    profilePictureUrl: row.profile_picture_url ?? row.profilePictureUrl,
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt
  };
}

export class UserService {
  // Create a new user
  static async createUser(userData: {
    email: string;
    name: string;
    provider: string;
    googleId?: string;
    facebookId?: string;
    profilePictureUrl?: string;
  }): Promise<User> {
    const query = `
      INSERT INTO users (email, name, provider, google_id, facebook_id, profile_picture_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const values = [
      userData.email,
      userData.name,
      userData.provider,
      userData.googleId || null,
      userData.facebookId || null,
      userData.profilePictureUrl || null
    ];

    const result = await pool.query(query, values);
    return mapDbUser(result.rows[0]);
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] ? mapDbUser(result.rows[0]) : null;
  }

  // Find user by Google ID
  static async findByGoogleId(googleId: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE google_id = $1';
    const result = await pool.query(query, [googleId]);
    return result.rows[0] ? mapDbUser(result.rows[0]) : null;
  }

  // Find user by Facebook ID
  static async findByFacebookId(facebookId: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE facebook_id = $1';
    const result = await pool.query(query, [facebookId]);
    return result.rows[0] ? mapDbUser(result.rows[0]) : null;
  }

  // Update user
  static async updateUser(userId: string, updateData: Partial<User>): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    // Map camelCase fields to snake_case columns
    const columnMap: Record<string, string> = {
      profilePictureUrl: 'profile_picture_url',
      googleId: 'google_id',
      facebookId: 'facebook_id',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    };

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        const column = columnMap[key] || key;
        fields.push(`${column} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      return null;
    }

    // Reject clearly invalid UUIDs to avoid postgres errors during tests
    if (!/^[0-9a-fA-F-]{10,}$/.test(userId)) {
      return null;
    }
    values.push(userId);
    const query = `
      UPDATE users 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] ? mapDbUser(result.rows[0]) : null;
  }

  // Delete user
  static async deleteUser(userId: string): Promise<boolean> {
    // If an obviously invalid UUID is provided in tests, return false without querying
    if (!/^[0-9a-fA-F-]{10,}$/.test(userId)) {
      return false;
    }
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await pool.query(query, [userId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Get user with preferences
  static async getUserWithPreferences(userId: string): Promise<any> {
    if (!/^[0-9a-fA-F-]{10,}$/.test(userId)) {
      return null;
    }
    const query = `
      SELECT 
        u.*,
        p.timezone,
        p.language,
        p.units,
        p.notifications_enabled,
        p.email_notifications
      FROM users u
      LEFT JOIN user_preferences p ON u.id = p.user_id
      WHERE u.id = $1
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }
}

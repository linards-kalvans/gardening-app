-- Insert test users for development
INSERT INTO users (email, name, provider, google_id, facebook_id, profile_picture_url) VALUES
    ('test@example.com', 'Test User', 'google', 'google_123456789', NULL, 'https://via.placeholder.com/150'),
    ('demo@example.com', 'Demo User', 'facebook', NULL, 'facebook_987654321', 'https://via.placeholder.com/150')
ON CONFLICT (email) DO NOTHING;

-- Insert user preferences for test users
INSERT INTO user_preferences (user_id, timezone, language, units, notifications_enabled, email_notifications)
SELECT 
    u.id,
    'Europe/London',
    'en',
    'metric',
    true,
    true
FROM users u
WHERE u.email IN ('test@example.com', 'demo@example.com')
ON CONFLICT (user_id) DO NOTHING;

# OAuth Setup Guide for Gardening App

This guide will help you set up Google and Facebook OAuth credentials for the Gardening App.

## Google OAuth Setup

### Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project**:
   - Click "Select a project" → "New Project"
   - Name: "Gardening App"
   - Click "Create"

3. **Enable APIs**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google OAuth2 API"

### Step 2: Configure OAuth Consent Screen

1. **Go to "OAuth consent screen"**:
   - Choose "External" (unless you have Google Workspace)
   - Fill in required fields:
     - App name: "Gardening App"
     - User support email: your email
     - Developer contact: your email
   - Click "Save and Continue"

2. **Add Scopes**:
   - Click "Add or Remove Scopes"
   - Add: `../auth/userinfo.email` and `../auth/userinfo.profile`
   - Click "Update" → "Save and Continue"

3. **Add Test Users** (for development):
   - Add your email address
   - Click "Save and Continue"

### Step 3: Create OAuth Client ID

1. **Go to "Credentials"**:
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Gardening App Web Client"

2. **Configure Redirect URIs**:
   ```
   http://localhost:3001/api/auth/google/callback
   http://localhost:3001/auth/google/callback
   ```

3. **Get Credentials**:
   - **Client ID**: Copy this value
   - **Client Secret**: Copy this value

## Facebook OAuth Setup

### Step 1: Facebook Developers Console

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Create a new app**:
   - Click "Create App"
   - Choose "Consumer" or "Other"
   - App name: "Gardening App"
   - Contact email: your email
   - Click "Create App"

### Step 2: Configure Facebook Login

1. **Add Facebook Login product**:
   - In your app dashboard, click "Add Product"
   - Find "Facebook Login" and click "Set Up"

2. **Configure Facebook Login**:
   - Go to "Facebook Login" → "Settings"
   - **Valid OAuth Redirect URIs**:
     ```
     http://localhost:3001/api/auth/facebook/callback
     http://localhost:3001/auth/facebook/callback
     ```
   - Click "Save Changes"

### Step 3: Get App Credentials

1. **Go to "Settings" → "Basic"**:
   - **App ID**: Copy this value
   - **App Secret**: Click "Show" and copy this value

## Environment Configuration

After obtaining your credentials, update your environment file:

### 1. Create Environment File

```bash
# Run the setup script (recommended)
./setup-environment.sh

# OR manually copy the template
cp environment.example .env
```

### 2. Update OAuth Credentials

Edit the `.env` file in the project root directory:

```bash
nano .env
```

Update these values with your actual OAuth credentials:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret

# Facebook OAuth Configuration
FACEBOOK_APP_ID=your-actual-facebook-app-id
FACEBOOK_APP_SECRET=your-actual-facebook-app-secret
```

### 3. Restart Docker Containers

After updating the environment file:

```bash
# Restart containers to pick up new environment variables
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up -d
```

## Testing OAuth Setup

### 1. Test Google OAuth:
- Visit: `http://localhost:3001/api/auth/google`
- Should redirect to Google login page

### 2. Test Facebook OAuth:
- Visit: `http://localhost:3001/api/auth/facebook`
- Should redirect to Facebook login page

## Security Notes

### For Development:
- Use test users in Google OAuth consent screen
- Keep credentials in environment variables
- Never commit credentials to version control

### For Production:
- Use production redirect URIs
- Configure proper app domains
- Use strong JWT and session secrets
- Enable HTTPS for all redirect URIs

## Common Issues

### Google OAuth Issues:
- **"redirect_uri_mismatch"**: Check redirect URIs in Google Console
- **"access_denied"**: Check OAuth consent screen configuration
- **"invalid_client"**: Verify Client ID and Secret

### Facebook OAuth Issues:
- **"Invalid redirect_uri"**: Check redirect URIs in Facebook settings
- **"App not available"**: Ensure app is not in development mode restrictions
- **"Invalid app_id"**: Verify App ID and Secret

## Next Steps

1. **Obtain credentials** from both providers
2. **Update environment files** with actual credentials
3. **Test OAuth flows** in development
4. **Implement OAuth strategies** in the backend (Day 3-4 tasks)

## Support

If you encounter issues:
1. Check the OAuth provider documentation
2. Verify redirect URIs match exactly
3. Ensure all required scopes are configured
4. Check that your app is not in restricted mode

#!/bin/bash

# Gardening App - Environment Setup Script
# This script helps you set up the environment configuration properly

echo "🌱 Gardening App - Environment Setup"
echo "=================================="

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled. Keeping existing .env file."
        exit 1
    fi
fi

# Copy environment template
echo "📋 Copying environment template..."
cp environment.example .env

echo "✅ Environment file created: .env"
echo ""
echo "🔧 Next steps:"
echo "1. Edit .env file with your actual values:"
echo "   nano .env"
echo ""
echo "2. Update OAuth credentials:"
echo "   - Get Google OAuth credentials from Google Cloud Console"
echo "   - Get Facebook OAuth credentials from Facebook Developers"
echo "   - Update GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET"
echo "   - Update FACEBOOK_APP_ID, FACEBOOK_APP_SECRET"
echo ""
echo "3. Start the development environment:"
echo "   docker-compose -f docker-compose.dev.yml up -d"
echo ""
echo "📖 For detailed OAuth setup instructions, see: OAUTH-SETUP-GUIDE.md"
echo ""
echo "🎉 Environment setup complete!"

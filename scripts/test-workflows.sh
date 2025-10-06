#!/bin/bash

# Test GitHub Actions workflows locally using act
# Install act first: https://github.com/nektos/act

echo "🧪 Testing GitHub Actions workflows locally..."

# Check if act is installed
if ! command -v act &> /dev/null; then
    echo "❌ act is not installed. Please install it first:"
    echo "   curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash"
    echo "   or visit: https://github.com/nektos/act"
    exit 1
fi

# Create .secrets file for local testing
echo "🔐 Creating local secrets file..."
cat > .secrets << EOF
# Local testing secrets (these are dummy values)
DOCKER_USERNAME=testuser
DOCKER_PASSWORD=testpass
CODECOV_TOKEN=test-token
EOF

# Test the main CI workflow
echo "🔄 Testing main CI workflow..."
act push -W .github/workflows/ci.yml --secret-file .secrets --env NODE_ENV=test

# Test the security workflow
echo "🔒 Testing security workflow..."
act push -W .github/workflows/security.yml --secret-file .secrets

# Test the test matrix workflow
echo "🧪 Testing test matrix workflow..."
act push -W .github/workflows/test-matrix.yml --secret-file .secrets

# Clean up
echo "🧹 Cleaning up..."
rm -f .secrets

echo "✅ Local workflow testing completed!"
echo "📋 Check the output above for any issues."
echo "💡 For more detailed testing, use: act push --list"

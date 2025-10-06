#!/bin/bash

# Local CI testing script that simulates GitHub Actions environment
# This runs the same steps as the GitHub Actions workflow locally

set -e  # Exit on any error

echo "🚀 Starting local CI testing..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "backend/package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Step 1: Setup Node.js environment
print_status "Setting up Node.js environment..."
cd backend

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js version: $NODE_VERSION"

# Step 2: Install dependencies
print_status "Installing dependencies..."
npm ci
print_success "Dependencies installed"

# Step 3: Setup test database
print_status "Setting up test database..."

# Check if PostgreSQL is running
if ! pg_isready -q; then
    print_warning "PostgreSQL is not running. Starting with Docker..."
    
    # Start PostgreSQL with Docker
    docker run --name test-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:15
    
    # Wait for PostgreSQL to be ready
    print_status "Waiting for PostgreSQL to be ready..."
    sleep 10
    
    # Test connection
    until pg_isready -h localhost -p 5432 -U postgres; do
        print_status "Waiting for PostgreSQL..."
        sleep 2
    done
fi

# Create test databases
print_status "Creating test databases..."
PGPASSWORD=password psql -h localhost -U postgres -d postgres -c "DROP DATABASE IF EXISTS gardening_app_test;" || true
PGPASSWORD=password psql -h localhost -U postgres -d postgres -c "CREATE DATABASE gardening_app_test;"
PGPASSWORD=password psql -h localhost -U postgres -d postgres -c "DROP DATABASE IF EXISTS gardening_app_dev;" || true
PGPASSWORD=password psql -h localhost -U postgres -d postgres -c "CREATE DATABASE gardening_app_dev;"
print_success "Test databases created"

# Step 4: Run database migrations
print_status "Running database migrations..."
PGPASSWORD=password psql -h localhost -U postgres -d gardening_app_test -f database/init/01-create-tables.sql
PGPASSWORD=password psql -h localhost -U postgres -d gardening_app_dev -f database/init/01-create-tables.sql
print_success "Database migrations completed"

# Step 5: Run linting
print_status "Running ESLint..."
npm run lint
print_success "Linting passed"

# Step 6: Run tests
print_status "Running tests..."
export NODE_ENV=test
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=gardening_app_test
export DB_USER=postgres
export DB_PASSWORD=password
export JWT_SECRET=test-jwt-secret
export SESSION_SECRET=test-session-secret

npm run test:ci
print_success "Tests completed"

# Step 7: Run security audit
print_status "Running security audit..."
npm audit --audit-level moderate || print_warning "Security audit found issues (this is expected in development)"
print_success "Security audit completed"

# Step 8: Build application
print_status "Building application..."
npm run build
print_success "Build completed"

# Step 9: Cleanup
print_status "Cleaning up..."
if docker ps -q -f name=test-postgres | grep -q .; then
    docker stop test-postgres
    docker rm test-postgres
    print_success "Docker containers cleaned up"
fi

# Return to project root
cd ..

print_success "🎉 Local CI testing completed successfully!"
print_status "All steps from the GitHub Actions workflow have been executed locally."
print_status "If you see any errors above, they would also appear in the GitHub Actions pipeline."

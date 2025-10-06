#!/bin/bash

# Setup test database for automated testing
echo "🧪 Setting up test database..."

# Database connection details
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-postgres}
DB_PASSWORD=${DB_PASSWORD:-password}
TEST_DB_NAME="gardening_app_test"

# Create test database
echo "📊 Creating test database: $TEST_DB_NAME"
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $TEST_DB_NAME;"
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $TEST_DB_NAME;"

# Run database migrations on test database
echo "🔧 Running database migrations on test database..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $TEST_DB_NAME -f database/init/01-create-tables.sql

echo "✅ Test database setup complete!"
echo "📊 Test database: $TEST_DB_NAME"
echo "🔗 Connection: $DB_USER@$DB_HOST:$DB_PORT/$TEST_DB_NAME"

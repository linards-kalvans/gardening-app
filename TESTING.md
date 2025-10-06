# 🧪 Testing Guide

This guide explains how to test the GitHub Actions workflows locally and troubleshoot common issues.

## 🚀 Quick Start

### Option 1: Simple Local Testing
```bash
# Run the same steps as GitHub Actions locally
./scripts/test-ci-locally.sh
```

### Option 2: Docker-based Testing
```bash
# Test using Docker Compose (mimics GitHub Actions environment)
docker-compose -f docker-compose.test.yml up --build
```

### Option 3: Using Act (GitHub Actions Local Runner)
```bash
# Install act first
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Test workflows locally
./scripts/test-workflows.sh
```

## 🔧 Prerequisites

### Required Software:
- **Node.js 18+** - For running tests
- **PostgreSQL 15** - For database testing
- **Docker** - For containerized testing
- **Git** - For version control

### Optional Software:
- **Act** - For running GitHub Actions locally
- **Docker Compose** - For multi-container testing

## 📋 Testing Methods

### 1. Local Script Testing (Recommended)

The `test-ci-locally.sh` script simulates the exact GitHub Actions workflow:

```bash
# Make sure you're in the project root
cd /path/to/gardening-app

# Run the local CI test
./scripts/test-ci-locally.sh
```

**What it does:**
- ✅ Checks Node.js version
- ✅ Installs dependencies with `npm ci`
- ✅ Sets up PostgreSQL (with Docker if needed)
- ✅ Creates test databases
- ✅ Runs database migrations
- ✅ Executes ESLint linting
- ✅ Runs the full test suite
- ✅ Performs security audit
- ✅ Builds the application
- ✅ Cleans up resources

### 2. Docker Compose Testing

For a more isolated environment that closely mimics GitHub Actions:

```bash
# Start the test environment
docker-compose -f docker-compose.test.yml up --build

# View logs
docker-compose -f docker-compose.test.yml logs -f

# Clean up
docker-compose -f docker-compose.test.yml down -v
```

### 3. Act (GitHub Actions Local Runner)

For testing the actual workflow files:

```bash
# Install act
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# List available workflows
act --list

# Run a specific workflow
act push -W .github/workflows/ci.yml

# Run with secrets
act push -W .github/workflows/ci.yml --secret-file .secrets
```

## 🐛 Troubleshooting

### Common Issues:

#### 1. **PostgreSQL Connection Failed**
```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432 -U postgres

# Start PostgreSQL with Docker
docker run --name test-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:15
```

#### 2. **Node.js Version Issues**
```bash
# Check Node.js version
node --version

# Install Node.js 18+ if needed
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### 3. **Dependencies Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. **Test Database Issues**
```bash
# Reset test database
PGPASSWORD=password psql -h localhost -U postgres -d postgres -c "DROP DATABASE IF EXISTS gardening_app_test;"
PGPASSWORD=password psql -h localhost -U postgres -d postgres -c "CREATE DATABASE gardening_app_test;"
```

#### 5. **Docker Issues**
```bash
# Clean up Docker containers
docker system prune -a

# Remove test containers
docker rm -f test-postgres
```

## 🔍 Debugging Workflows

### 1. **Check Workflow Syntax**
```bash
# Validate workflow files
act --list
```

### 2. **Test Individual Steps**
```bash
# Test only the database setup
docker-compose -f docker-compose.test.yml up postgres-test

# Test only the Node.js environment
cd backend && npm ci && npm run test
```

### 3. **Verbose Output**
```bash
# Run with detailed logging
act push -W .github/workflows/ci.yml --verbose

# Or with the local script
DEBUG=1 ./scripts/test-ci-locally.sh
```

## 📊 Expected Results

### Successful Test Run:
```
🚀 Starting local CI testing...
[INFO] Setting up Node.js environment...
[SUCCESS] Node.js version: v18.17.0
[INFO] Installing dependencies...
[SUCCESS] Dependencies installed
[INFO] Setting up test database...
[SUCCESS] Test databases created
[INFO] Running database migrations...
[SUCCESS] Database migrations completed
[INFO] Running ESLint...
[SUCCESS] Linting passed
[INFO] Running tests...
[SUCCESS] Tests completed
[INFO] Running security audit...
[SUCCESS] Security audit completed
[INFO] Building application...
[SUCCESS] Build completed
[SUCCESS] 🎉 Local CI testing completed successfully!
```

### Test Coverage:
- **Statements**: 62.22%
- **Branches**: 49.38%
- **Functions**: 55.17%
- **Lines**: 61.14%

## 🚀 GitHub Actions Integration

### Workflow Status:
- **CI/CD Pipeline**: Runs on every push and PR
- **Security Scan**: Runs weekly and on main branch
- **Test Matrix**: Tests on Node.js 16, 18, 20
- **Deploy**: Runs on main branch pushes

### Required Secrets (GitHub Repository Settings):
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password/token

### Optional Secrets:
- `CODECOV_TOKEN`: Codecov token for coverage
- `SLACK_WEBHOOK`: Slack notifications
- `DISCORD_WEBHOOK`: Discord notifications

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Act Documentation](https://github.com/nektos/act)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Jest Testing Framework](https://jestjs.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** - Look for error messages in the output
2. **Verify prerequisites** - Ensure all required software is installed
3. **Test individual components** - Run database, tests, and build separately
4. **Check GitHub Actions** - Look at the actual workflow runs in GitHub
5. **Create an issue** - Report bugs or request help

---

**Happy Testing! 🧪✨**

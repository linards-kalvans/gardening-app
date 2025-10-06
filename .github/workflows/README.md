# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Gardening App project.

## Workflows Overview

### 🔄 CI/CD Pipeline (`ci.yml`)
**Triggers:** Push to any branch, Pull requests to main/develop
**Purpose:** Main continuous integration pipeline

**Jobs:**
- **Test**: Runs unit, integration, and database tests
- **Build**: Compiles the application and creates artifacts
- **Docker**: Builds and pushes Docker images (main/develop only)
- **Security**: Scans for vulnerabilities
- **Notify**: Sends notifications about pipeline results

### 🚀 Deploy (`deploy.yml`)
**Triggers:** Push to main, Manual dispatch
**Purpose:** Production deployment

**Features:**
- Environment: production
- Health checks
- Deployment notifications

### 🔒 Security (`security.yml`)
**Triggers:** Weekly schedule, Push to main, Pull requests
**Purpose:** Security scanning and dependency management

**Jobs:**
- **Dependency Check**: npm audit and outdated package detection
- **CodeQL**: Static code analysis
- **Secret Scan**: TruffleHog secret detection

### 🧪 Test Matrix (`test-matrix.yml`)
**Triggers:** Push to main/develop, Pull requests
**Purpose:** Cross-version testing

**Features:**
- Tests on Node.js 16, 18, 20
- Coverage reporting per version
- Database setup for each version

## Environment Variables

The following secrets need to be configured in GitHub repository settings:

### Required Secrets:
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password/token

### Optional Secrets:
- `CODECOV_TOKEN`: Codecov token for coverage reporting
- `SLACK_WEBHOOK`: Slack webhook for notifications
- `DISCORD_WEBHOOK`: Discord webhook for notifications

## Database Setup

All workflows use PostgreSQL 15 with the following configuration:
- **Host**: localhost
- **Port**: 5432
- **User**: postgres
- **Password**: password
- **Test Database**: gardening_app_test
- **Dev Database**: gardening_app_dev

## Coverage Reporting

Coverage reports are generated and uploaded to Codecov with the following flags:
- `backend`: Main backend coverage
- `node-16`: Node.js 16 coverage
- `node-18`: Node.js 18 coverage
- `node-20`: Node.js 20 coverage

## Workflow Status

| Workflow | Status | Purpose |
|----------|--------|---------|
| CI/CD | ✅ Active | Main testing and building |
| Deploy | ✅ Active | Production deployment |
| Security | ✅ Active | Security scanning |
| Test Matrix | ✅ Active | Cross-version testing |

## Local Development

To run the same tests locally:

```bash
# Install dependencies
cd backend && npm ci

# Setup test database
./scripts/setup-test-db.sh

# Run tests
npm run test:ci

# Run linting
npm run lint

# Run security audit
npm audit
```

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Ensure PostgreSQL is running
   - Check database credentials
   - Verify database exists

2. **Test Failures**
   - Check environment variables
   - Ensure test database is set up
   - Verify all dependencies are installed

3. **Docker Build Failures**
   - Check Dockerfile syntax
   - Verify base image availability
   - Check for missing dependencies

### Debug Commands:

```bash
# Check database connection
psql -h localhost -U postgres -d gardening_app_test -c "SELECT NOW();"

# Run specific test suite
npm test -- --testPathPatterns=auth.test

# Check coverage
npm run test:coverage

# Lint specific files
npm run lint -- src/controllers/
```

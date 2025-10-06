# Gardening App - Docker Development Environment

This document describes how to set up and run the Gardening App development environment using Docker.

## Prerequisites

- Docker Desktop or Docker Engine
- Docker Compose
- Git

## Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd gardening-app
```

### 2. Environment Configuration
```bash
# Run the setup script (recommended)
./setup-environment.sh

# OR manually copy and configure
cp environment.example .env
nano .env
```

**Important**: Update the OAuth credentials in your `.env` file:
- Get Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
- Get Facebook OAuth credentials from [Facebook Developers](https://developers.facebook.com/)
- See `OAUTH-SETUP-GUIDE.md` for detailed instructions

### 3. Start Development Environment
```bash
# Start all services (database + backend)
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### 4. Stop Development Environment
```bash
# Stop all services
docker-compose -f docker-compose.dev.yml down

# Stop and remove volumes (clean slate)
docker-compose -f docker-compose.dev.yml down -v
```

## Services

### PostgreSQL Database
- **Port**: 5432
- **Database**: gardening_app_dev
- **User**: postgres
- **Password**: password
- **Health Check**: Automatic connection testing

### Backend API
- **Port**: 3001
- **Health Check**: http://localhost:3001/api/health
- **Hot Reload**: Enabled for development
- **Database**: Automatically connects to PostgreSQL

## Development Commands

### Backend Development
```bash
# Run backend in development mode
cd backend
npm run dev

# Build backend
npm run build

# Run tests
npm test
```

### Database Operations
```bash
# Connect to database
docker exec -it gardening_app_postgres_dev psql -U postgres -d gardening_app_dev

# View database logs
docker logs gardening_app_postgres_dev

# Reset database
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

## Environment Variables

### Required Variables
- `NODE_ENV`: Environment (development/production)
- `PORT`: Backend server port
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: JWT signing secret
- `SESSION_SECRET`: Session secret

### OAuth Variables (Optional for development)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `FACEBOOK_APP_ID`: Facebook OAuth app ID
- `FACEBOOK_APP_SECRET`: Facebook OAuth app secret

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check database logs
docker logs gardening_app_postgres_dev

# Test database connection
docker exec -it gardening_app_postgres_dev pg_isready -U postgres
```

### Backend Issues
```bash
# Check backend logs
docker logs gardening_app_backend_dev

# Restart backend service
docker-compose -f docker-compose.dev.yml restart backend
```

### Port Conflicts
If ports 3001 or 5432 are already in use:
```bash
# Check what's using the ports
lsof -i :3001
lsof -i :5432

# Stop conflicting services or change ports in docker-compose.dev.yml
```

## Database Schema

The database is automatically initialized with:
- User authentication tables
- User preferences
- Proper indexes for performance
- Test data for development

## Health Checks

- **Backend**: http://localhost:3001/api/health
- **Database**: Automatic connection testing
- **Docker**: Built-in health checks for all services

## Production Deployment

For production deployment, use the main `docker-compose.yml` file:
```bash
docker-compose up -d
```

This will use production-optimized configurations and security settings.

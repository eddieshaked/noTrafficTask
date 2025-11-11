# Prisma Setup

This project uses Prisma with SQLite for database management.

## Initial Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

3. **Run migrations to create the database:**
   ```bash
   npm run prisma:migrate
   ```

## Available Scripts

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and run migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Database Location

The SQLite database will be created at: `backend/prisma/data/database.db`

## Schema

The schema is defined in `backend/prisma/schema.prisma`. The current model:

- **Polygon**: Stores polygon data with id, name, points (JSON), userId, and createdAt

## Benefits of Prisma

- ✅ Type-safe database queries
- ✅ Auto-completion in IDE
- ✅ No need for manual SQL queries
- ✅ Easy migrations
- ✅ Works with SQLite (no build tools needed!)


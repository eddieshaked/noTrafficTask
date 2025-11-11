# NoTraffic

A full-stack application with Vite frontend and Node.js backend.

## Project Structure

```
NoTraffic/
├── frontend/       # React + TypeScript + Vite frontend
│   └── src/
│       └── features/    # Feature-based structure
│           └── hello/
│               └── pages/
└── backend/        # Node.js + TypeScript backend
    └── src/
        └── services/    # Services-based structure
            ├── logger/
            ├── database/
            └── root/
```

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Styled Components
- React Query
- React Router

### Backend
- Node.js
- TypeScript
- Express
- Winston (Logger)
- SQLite (better-sqlite3)

## Getting Started

### Install Dependencies

```bash
npm run install:all
```

Or install individually:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run separately:

**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend:**
```bash
cd backend
npm run dev
```

### Build

```bash
npm run build
```

## Ports

The frontend and backend run on **different ports** to avoid conflicts:

- **Frontend**: http://localhost:3000 (Vite dev server)
- **Backend**: http://localhost:3001 (Express API server)

### Port Configuration

Ports can be customized using environment variables:

**Frontend** (in `frontend/vite.config.ts`):
- `VITE_PORT` - Frontend port (default: 3000)
- `VITE_BACKEND_PORT` - Backend port for proxy (default: 3001)

**Backend** (in `backend/src/index.ts`):
- `PORT` - Backend port (default: 3001)
- `FRONTEND_PORT` - Frontend port for CORS (default: 3000)

The frontend automatically proxies `/api` requests to the backend server.


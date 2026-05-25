# Expense Tracker - Copilot Instructions

This is a full-stack expense tracking application with React frontend and Node.js/Express backend.

## Quick Start

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Setup

1. Create `.env` file in backend folder with MongoDB URI and JWT secret
2. Ensure MongoDB is running locally or use MongoDB Atlas

## Development Workflow

- Backend runs on port 5000
- Frontend runs on port 3000 (with Vite)
- API requests are proxied from frontend to backend

## Project Structure

- `backend/` - Express.js API server with MongoDB
- `frontend/` - React application with Vite
- `models/` - Mongoose schemas for User and Expense
- `routes/` - API route handlers
- `components/` - React UI components
- `context/` - React context for state management

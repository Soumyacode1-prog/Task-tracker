# Task Tracker

Simple full-stack task app with login/signup and protected task management.

PROJECT VIDEO LINK :
https://docs.google.com/videos/d/1wODozt0t98vMM3ai8OjcEL2IyHRl9zjpfXkT1_-6ovk/edit?usp=sharing

## Features

- Landing page before login/register
- User signup and login using JWT
- Create tasks
- View only your own tasks
- Mark tasks complete

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL

## Local Setup

### 1. Install Required Tools

- Node.js + npm: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/download/

Check installation:

```bash
node --version
npm --version
psql --version
```

### 2. Create Database and Tables

Open PostgreSQL:

```bash
psql -U postgres
```

Create DB and connect:

```sql
CREATE DATABASE tasktracker;
\c tasktracker
```

Create tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Exit:

```sql
\q
```

### 3. Configure Environment Variables

Create/update `server/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=2580
DB_NAME=tasktracker
JWT_SECRET=123456
CLIENT_URL=http://localhost:5173
```

### 4. Start Backend

```bash
cd server
npm install
npm run dev
```

API runs at `http://localhost:5000`.

### 5. Start Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## App Flow

1. Open landing page at `http://localhost:5173`
2. Signup or login
3. After valid login, access task page
4. Create tasks and mark them complete

## API Endpoints

Auth:

- `POST /auth/signup`
- `POST /auth/login`

Tasks (Protected, `Authorization: Bearer <token>`):

- `POST /tasks`
- `GET /tasks`
- `PATCH /tasks/:id/complete` (used by UI)
- `PATCH /tasks/:id` (toggle endpoint also available)

## Postman Quick Test

Signup:

```http
POST http://localhost:5000/auth/signup
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Login:

```http
POST http://localhost:5000/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Create task:

```http
POST http://localhost:5000/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries"
}
```

## Folder Structure

```text
task-tracker/
├── client/
│   └── src/
│       ├── pages/
│       ├── components/
│       └── api/
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   └── server.js
└── README.md
```

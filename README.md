# Task Tracker

A simple to-do list app where you can create an account, add tasks, mark them done, and keep everything organized.

## What This App Does

- Create a login account with email & password
- Add new tasks anytime
- Mark tasks as done 
- See all your tasks in one place
- Only you can see your tasks (private)

## What You Need Installed

You need 2 things before starting. If you don't have them, download and install:

1. **Node.js** (includes npm) — https://nodejs.org/
2. **PostgreSQL** — https://www.postgresql.org/download/

Check they're installed by running these commands:

```bash
node --version
npm --version
psql --version
```

If you see version numbers, you're good to go!

---

## How to Set Everything Up

### Step 1: Get Your Database Ready

Open a terminal and log into PostgreSQL:

```bash
psql -U postgres
```

Create a new database:

```sql
CREATE DATABASE "task-tracker";
```

Connect to it:

```sql
\c task-tracker
```

Create the tables:

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

Check that everything was created:

```sql
\dt
```

You should see `users` and `tasks` tables. Type `\q` to exit.

### Step 2: Set Up the Environment File

In the `server` folder, create or open `.env` and make sure it has:

```env
PORT=""
DB_HOST=""
DB_PORT=""
DB_USER=""
DB_PASSWORD=""
DB_NAME=""
JWT_SECRET=""
CLIENT_URL=""
```

**What do these mean?**

- `PORT` - Where the app's backend runs (port 5000)
- `DB_HOST` - Where the database is (localhost = your computer)
- `DB_PORT` - Database port (always 5432 for PostgreSQL)
- `DB_USER` - Database user (usually `postgres`)
- `DB_PASSWORD` - Your PostgreSQL password
- `DB_NAME` - The database name we just created
- `JWT_SECRET` - Secret code for login tokens
- `CLIENT_URL` - Where the frontend runs

### Step 3: Start the Backend

Open a terminal and go to the `server` folder:

```bash
cd server
npm install
npm run dev
```

You should see: `Server running on port 5000`

Keep this terminal open!

### Step 4: Start the Frontend

Open a **new terminal** and go to the `client` folder:

```bash
cd client
npm install
npm run dev
```

You'll see something like: `Local: http://localhost:5173`

Open this link in your browser. You're done! 🎉

---

## How to Use It

## How to Use It

1. Go to http://localhost:5173
2. **Sign up** with your email and password
3. **Log in** with your account
4. **Add a task** in the text box and click "Add Task"
5. **Mark it done** by clicking "Mark Completed"
6. Click **Logout** to leave

That's it!

---

## Testing with Postman

Don't want to use the browser? Test everything with Postman!

**Download Postman:** https://www.postman.com/downloads/

### 1. Sign Up

```
POST http://localhost:5000/auth/signup

Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

### 2. Login

```
POST http://localhost:5000/auth/login

Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
```

Copy the token for the next requests!

### 3. Create a Task

```
POST http://localhost:5000/tasks

Headers:
Authorization: Bearer <paste_your_token_here>

Body (JSON):
{
  "title": "Buy groceries"
}

Response:
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries",
  "completed": false,
  "created_at": "2026-04-05T10:30:00.000Z"
}
```

### 4. Get All Your Tasks

```
GET http://localhost:5000/tasks

Headers:
Authorization: Bearer <paste_your_token_here>

Response:
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Buy groceries",
    "completed": false,
    "created_at": "2026-04-05T10:30:00.000Z"
  }
]
```

### 5. Mark Task as Done

```
PATCH http://localhost:5000/tasks/1/complete

Headers:
Authorization: Bearer <paste_your_token_here>

Response:
{
  "id": 1,
  "user_id": 1,
  "title": "Buy groceries",
  "completed": true,
  "created_at": "2026-04-05T10:30:00.000Z"
}
```

---

## Database Tables

**Users Table**
- `id` - Unique number for each user
- `email` - User's email (unique)
- `password` - Encrypted password
- `created_at` - When account was made

**Tasks Table**
- `id` - Unique number for each task
- `user_id` - Which user owns this task
- `title` - What the task is
- `completed` - Is it done? (true/false)
- `created_at` - When task was created

---

**Database error?**
- Make sure PostgreSQL is running
- Check that your password in `.env` is correct
- Make sure you created the database: `psql -U postgres -l` (look for `task-tracker`)

**Port 5000 already in use?**
- Change `PORT` in `.env` to something else like `5001`

**Nothing loading?**
- Make sure both `npm run dev` commands are running (one in server, one in client)
- Refresh your browser
- Check if http://localhost:5173 loads in the browser

---

## What's Really Happening (The Tech Part)

**Backend** — Node.js + Express (listens on port 5000)
**Frontend** — React app (listens on port 5173)
**Database** — PostgreSQL (stores your user data and tasks)

When you sign up:
1. Your password gets scrambled (hashed) for security
2. A special code (JWT token) is created to keep you logged in
3. Every time you ask for your tasks, the app checks this token

Security notes:
- Your password is encrypted, nobody can read it
- You can only see your own tasks
- Login tokens expire after 7 days

---

## Folder Structure

```
task-tracker/
├── client/           ← The website (React)
│   └── src/
│       ├── pages/    ← Login, Signup, Tasks pages
│       ├── components/ ← Task cards
│       └── api/      ← Talks to the backend
├── server/           ← The backend (Node.js)
│   ├── controllers/  ← Brain of the app
│   ├── routes/       ← API endpoints
│   ├── db/           ← Database connection
│   └── .env          ← Settings file
└── README.md         ← This file
```
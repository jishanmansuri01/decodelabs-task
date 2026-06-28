# DecodeLabs — Full Stack Internship Tasks

This repository contains all tasks for the Full Stack Web Development internship, organized task-wise as required by the assignment. Each task lives in its own folder and can be reviewed independently.

**Project:** Job Portal — a platform where job seekers can browse and apply to jobs, and employers can post listings and manage applicants.

---

## 📁 Repository Structure

```
decodelabs-task/
├── Task-1-Frontend/
│   └── job-portal/          → React frontend (UI, pages, mock data)
│
├── Task-2-Backend/
│   └── server/              → Express REST API (auth, jobs, applications)
│   └── screenshots/         → Postman test screenshots
│   └── API_TESTING.md       → API documentation with test results
│
└── Task-3-Database/         → MongoDB integration (coming next)
```

---

## ✅ Task 1 — Frontend (React)

A complete React UI with light theme, built with mock data before backend integration.

**Pages included:**
- Home (hero, search, featured jobs)
- Browse Jobs (filter by category/type/location, search)
- Job Detail page
- Apply modal (name, email, phone, resume, cover note)
- Post a Job (employer form)
- Login / Register (role toggle: seeker vs employer)
- Employer Dashboard (stats + listings table)

📂 [View Task 1 folder](./Task-1-Frontend)

---

## ✅ Task 2 — Backend APIs (Node.js + Express)

REST API built with Express, JWT authentication, and role-based access control (seeker vs employer). Currently uses in-memory mock data — will be connected to MongoDB in Task 3.

**Routes implemented:**

| Route | Method | Auth | Role |
|---|---|---|---|
| `/api/health` | GET | No | — |
| `/api/auth/register` | POST | No | — |
| `/api/auth/login` | POST | No | — |
| `/api/jobs` | GET | No | — |
| `/api/jobs/:id` | GET | No | — |
| `/api/jobs` | POST | Yes | employer |
| `/api/jobs/:id` | PUT | Yes | employer (owner) |
| `/api/jobs/:id` | DELETE | Yes | employer (owner) |
| `/api/applications` | POST | Yes | seeker |
| `/api/applications/my` | GET | Yes | seeker |
| `/api/applications/job/:jobId` | GET | Yes | employer (owner) |
| `/api/applications/:id/status` | PUT | Yes | employer |


## 🔜 Task 3 — Database Integration (MongoDB)

Coming next: connecting the Express backend to a real MongoDB database using Mongoose, replacing all in-memory mock data with persistent schemas for Users, Jobs, and Applications.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Auth:** JWT, bcryptjs
- **Database:** MongoDB + Mongoose (Task 3)

---

## 🚀 How to Run Locally

**Frontend:**
```bash
cd Task-1-Frontend/job-portal
npm install
npm run dev
```

**Backend:**
```bash
cd Task-2-Backend/server
npm install
npm run dev
```
Backend runs on `http://localhost:5000` — test with `GET /api/health`.

# Employee Directory Search Application

A production-ready full-stack employee management system built with FastAPI backend and React frontend using clean 4-layer architecture.

---

## Table of Contents

1. [Features](#features)
2. [Screenshots](#screenshots)
3. [Architecture](#architecture)
4. [API Reference](#api-reference)
5. [Setup & Deployment](#setup--deployment)

---

## Features

- Search employees by name or department
- Filter employees by department with quick-access chips
- View employee details in structured table format
- Dynamic department suggestions from existing data
- Pagination support with limit and offset
- Comprehensive input validation and error handling
- Responsive user interface with Tailwind CSS
- Production-ready deployment with health checks

---

## Screenshots

### Dashboard View
```Desktop```
![alt text](image-3.png)

```Responsive```

![alt text](image-2.png)


### Username Filtering
![alt text](image-4.png)


### Department Filtering
![alt text](image-5.png)

---

## Architecture

### Folder Structure

```
django/
├── backend/app/
│   ├── database/          # Database connection & configuration
│   ├── exception/         # Custom exception classes
│   ├── models/            # SQLAlchemy ORM models
│   ├── repository/        # Data access layer (Layer 4)
│   ├── services/          # Business logic (Layer 2)
│   ├── routers/           # API routes (Layer 1)
│   └── schemas/           # Pydantic validation models
│
├── frontend/src/features/employee-management/
│   ├── pages/            # Page components (UI Layer - Layer 1)
│   ├── components/       # Reusable components (UI Layer - Layer 1)
│   ├── hooks/            # useEmployees, useEmployeeSearch (Layer 2)
│   ├── services/         # employeeApi.js Axios client (Layer 4)
│   └── employee.slice.js # Redux state (optional - Layer 3)
│
└── README.md
```

### 4-Layer Architecture Model

```
Layer 1: UI (Presentation)
    Pages & Components render, handle user interactions
            ↓
Layer 2: Hooks (Orchestration)
    useEmployees & useEmployeeSearch manage state and behavior
            ↓
Layer 3: State (Memory)
    useState, useCallback, useRef maintain local state
            ↓
Layer 4: API (Backend Communication)
    Axios service layer communicates with FastAPI backend
```

### Backend 4-Layer Pattern

| Layer | Component | Responsibility |
|-------|-----------|-----------------|
| 1 - Router | routers/employee_router.py | Receive requests, validate params, call services |
| 2 - Service | services/employee_service.py | Implement business logic, validate rules |
| 3 - Repository | repository/employee_repository.py | Execute database queries with SQLAlchemy |
| 4 - Database | models/ + database/ | Define schema, manage connections |

### Frontend 4-Layer Pattern

| Layer | Component | Responsibility |
|-------|-----------|-----------------|
| 1 - UI | pages/ + components/ | Render React components, handle interactions |
| 2 - Hooks | hooks/ | Orchestrate state and API calls |
| 3 - State | useState, useCallback, useRef | Maintain local application state |
| 4 - API | services/employeeApi.js | HTTP client for backend communication |

---

## API Reference

**Base URL**: `http://localhost:8000/api/v1`

### API 1: GET /employees - Search by Name or Department

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| search | string | No | "" | Search term (matches name or department) |
| limit | integer | No | 50 | Results to return (1-100) |
| offset | integer | No | 0 | Skip N results (pagination) |

**Example**: `GET /employees?search=engineering&limit=10&offset=0`

**Response** (200):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@company.com",
    "department": "Engineering",
    "designation": "Senior Developer",
    "date_of_joining": "2021-05-10"
  }
]
```

**Errors**: 400 (Validation) | 503 (Database) | 500 (Server)

---

### API 2: GET /employees/department-search - Search by Department

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| department | string | Yes | - | Department name (exact match) |
| limit | integer | No | 50 | Results to return (1-100) |
| offset | integer | No | 0 | Skip N results (pagination) |

**Example**: `GET /employees/department-search?department=Engineering&limit=10`

**Response** (200):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@company.com",
    "department": "Engineering",
    "designation": "Senior Developer",
    "date_of_joining": "2021-05-10"
  }
]
```

**Errors**: 400 (Missing dept) | 503 (Database) | 500 (Server)

---

### API 3: POST /employees - Create Employee

**Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "department": "Marketing",
  "designation": "Marketing Manager",
  "date_of_joining": "2024-02-15"
}
```

**Response** (201): Returns created employee with id

**Errors**: 400 (Validation) | 503 (Database) | 500 (Server)

### Search Performance Optimization

- Frontend avoids uncontrolled API calls by submitting search on explicit action (Search button), not on each keystroke.
- Backend query uses pagination (`limit`, `offset`) to avoid fetching unnecessary rows.
- Search logic is centralized in repository and uses indexed columns (`name`, `department`) to remain efficient as data grows.

---

## Setup & Deployment

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env`:
```env
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/employee_db
render_service=https://your-service.onrender.com
```

Run server:
```bash
uvicorn main:app --reload
# Server: http://localhost:8000
# Docs: http://localhost:8000/docs
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Run development server:
```bash
npm run dev
# App: http://localhost:5173
```

Build for production:
```bash
npm run build
# Output: frontend/dist/
```

### Database Setup

```sql
CREATE DATABASE employee_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Tables auto-create via SQLAlchemy on startup.

### Environment Templates

- Use [backend/.env.example](backend/.env.example) as backend environment template.
- Use [frontend/.env.example](frontend/.env.example) as frontend environment template.

---

## Technology Stack

**Backend**: FastAPI, SQLAlchemy ORM, MySQL, Python 3.8+  
**Frontend**: React 19, Axios, Tailwind CSS v4, Vite  
**Architecture**: 4-Layer clean architecture with separation of concerns

---

## Key Features

Architecture Benefits:
- Separation of Concerns: Each layer has single responsibility
- Testability: Independent layer testing with mocks
- Maintainability: Changes isolated to specific layers
- Scalability: Reusable components and services
- Type Safety: Pydantic validation + React hooks

---

## Summary

Production-ready full-stack application demonstrating enterprise architecture patterns, clean code principles, and professional development practices. The layered architecture ensures code is focused, testable, and maintainable.


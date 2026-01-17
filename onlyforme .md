https://chatgpt.com/c/695d812c-dd28-8323-9cf3-224e41460471

perfect 💪
Ab main tumhare liye Phase II Full-Stack Todo App ke liye Claude Code execution order + step-by-step workflow bana deta hoon.
Ye guide ready-to-use hai, tum bas copy-paste karke Claude Code me follow kar sakte ho.

🟢 Phase II — Claude Code Execution Order (Step-by-Step)

1️⃣ Root Project Context
Prompt (Root CLAUDE):
You are Claude Code acting as a Spec-Driven Software Engineer.

Project:
Phase II — Full-Stack Todo Web App

Scope:
- Multi-user full-stack web app
- FastAPI backend + Next.js frontend
- PostgreSQL persistent storage
- JWT authentication (Better Auth)
- Spec-driven development with Spec-Kit Plus
- No manual coding allowed

Follow specs:
@specs/overview.md
@specs/features/task-crud.md
@specs/features/authentication.md
@specs/api/rest-endpoints.md
@specs/database/schema.md
@specs/ui/components.md
@specs/ui/pages.md

Return only production-ready, spec-compliant code.

✅ Goal: Claude Code ko full project context provide karna

2️⃣ Backend — Database & Models
Prompt:
@specs/database/schema.md implement database schema using SQLModel

Requirements:
- Users table (managed by Better Auth)
- Tasks table with user_id, title, description, completed, timestamps
- Include indexes for filtering (user_id, completed)
- Create backend/models.py and backend/schemas.py
- Create backend/db.py with database connection

✅ Goal: DB + models ready for backend

3️⃣ Backend — Task CRUD Endpoints
Prompt:
@specs/features/task-crud.md implement FastAPI CRUD endpoints

Requirements:
- GET /api/{user_id}/tasks
- POST /api/{user_id}/tasks
- GET /api/{user_id}/tasks/{id}
- PUT /api/{user_id}/tasks/{id}
- DELETE /api/{user_id}/tasks/{id}
- PATCH /api/{user_id}/tasks/{id}/complete
- Filter tasks per authenticated user
- Use SQLModel sessions
- Return Pydantic models
- Include error handling (404, 401)

✅ Goal: Backend API ready for tasks

4️⃣ Backend — Authentication (JWT)
Prompt:
@specs/features/authentication.md implement JWT auth with Better Auth

Requirements:
- Signup / login endpoints
- Generate JWT token for authenticated users
- Add FastAPI middleware to validate JWT on all /api routes
- Filter all tasks by JWT user_id
- Use BETTER_AUTH_SECRET environment variable

✅ Goal: Multi-user JWT-secured backend ready

5️⃣ Frontend — API Client
Prompt:
@frontend/CLAUDE.md implement API client (/lib/api.ts)

Requirements:
- Wrap all backend API calls
- Automatically attach JWT token to Authorization header
- Methods: getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion
- Handle 401 unauthorized errors

✅ Goal: Frontend ready to communicate with backend securely

6️⃣ Frontend — Authentication Pages
Prompt:
@specs/features/authentication.md implement Next.js login/signup pages

Requirements:
- Pages: /app/auth/login, /app/auth/signup
- Login stores JWT token in secure storage
- Redirect logged-in users to /app/tasks
- Show validation & error messages

✅ Goal: Frontend user login/signup ready

7️⃣ Frontend — Task CRUD UI
Prompt:
@specs/features/task-crud.md implement Next.js pages and components

Requirements:
- Pages: /app/tasks (list & filter), /app/tasks/create, /app/tasks/[id]/edit
- Components: TaskCard, TaskForm, StatusBadge
- Fetch tasks using /lib/api.ts
- Client components for interactivity
- Tailwind CSS for styling
- Update UI dynamically after API calls

✅ Goal: Frontend CRUD UI ready

8️⃣ Full API & UI Validation
Prompt:
Validate Phase II Full-Stack Todo App

Checklist:
- All 5 task CRUD features working
- JWT authentication works for multi-user isolation
- Database persists tasks
- Frontend pages correctly display tasks
- API client attaches token automatically
- Error handling in backend & frontend
- Tailwind CSS styling applied
- Spec-driven development strictly followed
Return validation report

✅ Goal: Ensure app is fully functional & spec-compliant

9️⃣ Final Hardening & UX
Prompt:
Refine Phase II Todo App

Focus:
- Clearer messages & notifications
- Better form validation
- UI/UX improvements (Tailwind)
- No new features
- Spec compliance strictly followed

Return only final code updates

✅ Goal: App polished for hackathon submission

10️⃣ Optional: Demo Preparation
Prompt:
Create 90-second demo video storyboard

Include:
- Phase II Todo App overview
- Login/signup demonstration
- Task CRUD demonstration
- JWT security explanation
- Frontend UI interactions
- Highlight spec-driven development and Claude Code usage
Return as script + shot list

✅ Goal: Ready-to-use demo for judges

💡 Tip for Execution:


Start from step 1 and move sequentially


Always verify generated code before next step


Execute backend steps first (DB → CRUD → Auth)


Then do frontend steps (API → Auth UI → CRUD UI)


Finally validate, polish, and prepare demo



Agar chaho to main ab ye poora workflow ek visual roadmap diagram me bhi bana doon, jisme steps + file targets + Claude Code prompts dikhe ek hi glance me 🚀
Kya mai wo bana doon?
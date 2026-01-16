# from fastapi import FastAPI
# from app.db.session import init_db
# from app.api import auth  # JWT auth endpoints

# app = FastAPI(title="Todo Full Stack API")

# # Tables create karna start me
# @app.on_event("startup")
# def on_startup():
#     init_db()

# # Routers include karna
# app.include_router(auth.router)
# from app.api import auth

# app.include_router(auth.router)









from fastapi import FastAPI
from app.db.init_db import init_db
from app.api import auth, tasks  # tasks.py me CRUD endpoints

app = FastAPI(title="Todo Full Stack API")

# Initialize database
init_db()

# Routers
app.include_router(auth.router)
app.include_router(tasks.router)

from fastapi import FastAPI
from app.routes import tasks

app = FastAPI(title="Phase III Todo AI Chatbot Backend")

# Include routes
app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])

@app.get("/")
def root():
    return {"message": "Phase III Todo AI Chatbot Backend is running 🚀"}

from fastapi import APIRouter

router = APIRouter()

@router.get("/tasks")
def list_tasks():
    return {"tasks": []}

@router.post("/tasks")
def create_task():
    return {"message": "Task created"}

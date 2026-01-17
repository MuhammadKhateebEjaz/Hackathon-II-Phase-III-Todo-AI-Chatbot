from fastapi import APIRouter
from typing import List
from app.schemas.task_schema import Task, TaskCreate

router = APIRouter()

# Dummy in-memory tasks storage
tasks_db: List[Task] = []

@router.get("/", response_model=List[Task])
def get_tasks():
    return tasks_db

@router.post("/", response_model=Task)
def create_task(task: TaskCreate):
    new_task = Task(id=len(tasks_db)+1, title=task.title, description=task.description)
    tasks_db.append(new_task)
    return new_task

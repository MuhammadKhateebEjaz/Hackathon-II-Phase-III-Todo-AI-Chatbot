from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str | None = None

class TaskRead(TaskCreate):
    id: int
    completed: bool
    created_at: str
    updated_at: str

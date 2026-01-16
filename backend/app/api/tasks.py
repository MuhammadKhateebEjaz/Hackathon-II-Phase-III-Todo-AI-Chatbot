from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.models.task import Task, TaskCreate, TaskRead, TaskUpdate
from app.db.session import get_session
from app.api.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["tasks"])

# CREATE
@router.post("/", response_model=TaskRead)
def create_task(task: TaskCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    db_task = Task.from_orm(task)
    db_task.owner_id = current_user.id
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

# READ ALL (for current user)
@router.get("/", response_model=List[TaskRead])
def read_tasks(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    tasks = session.exec(select(Task).where(Task.owner_id == current_user.id)).all()
    return tasks

# READ ONE
@router.get("/{task_id}", response_model=TaskRead)
def read_task(task_id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

# UPDATE
@router.put("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_update: TaskUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    task_data = task_update.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(task, key, value)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

# DELETE
@router.delete("/{task_id}")
def delete_task(task_id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"detail": "Task deleted"}

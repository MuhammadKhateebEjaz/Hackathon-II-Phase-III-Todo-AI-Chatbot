from sqlmodel import SQLModel
from app.db.session import engine
from app.models.user import User
from app.models.task import Task  # agar aapka Task model bana hua hai

def init_db():
    SQLModel.metadata.create_all(engine)

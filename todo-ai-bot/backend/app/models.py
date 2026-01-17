# from sqlmodel import Field, SQLModel
# from typing import Optional
# import datetime

# class Todo(SQLModel, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     title: str
#     description: Optional[str] = None
#     completed: bool = False
#     created_at: datetime.datetime = Field(
#         default_factory=datetime.datetime.utcnow
#     )



# Placeholder for future database models (e.g., SQLAlchemy)
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class TaskModel(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)

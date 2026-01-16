# from sqlmodel import SQLModel, create_engine, Session
# from app.core.config import settings

# engine = create_engine(
#     settings.DATABASE_URL,
#     echo=True
# )

# def create_db_and_tables():
#     SQLModel.metadata.create_all(engine)

# def get_session():
#     with Session(engine) as session:
#         yield session





from sqlmodel import SQLModel, Session, create_engine
from app.core.config import settings

# Engine create karte hain
engine = create_engine(settings.DATABASE_URL, echo=True)

# Dependency for FastAPI
def get_session():
    with Session(engine) as session:
        yield session

# Tables create karne ke liye helper
def init_db():
    from app.models.user import User
    from app.models.task import Task
    SQLModel.metadata.create_all(engine)

from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker
from settings import settings

# 1️⃣ Create SQLAlchemy engine
engine = create_engine(settings.DATABASE_URL, echo=True)  # echo=True for SQL logs

# 2️⃣ Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3️⃣ Base class for models
Base = declarative_base()

# 4️⃣ Example Todo model
class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)

# 5️⃣ Create tables in the database
def init_db():
    Base.metadata.create_all(bind=engine)

# Example usage
if __name__ == "__main__":
    init_db()
    print("Database tables created successfully!")

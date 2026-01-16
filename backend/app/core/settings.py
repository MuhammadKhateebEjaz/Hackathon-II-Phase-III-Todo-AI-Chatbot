from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseModel):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://khateeb:12345@localhost/todo_app")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "mysecret")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")

settings = Settings()

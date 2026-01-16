from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseModel):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://khateeb:12345@localhost/todo_app")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "mysecret")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")

settings = Settings()

print(settings.DATABASE_URL)
print(settings.SECRET_KEY)
print(settings.ALGORITHM)




# import os
# from dotenv import load_dotenv

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
# SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

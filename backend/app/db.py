import os
from app.db.init_db import init_db

DATABASE_URL = os.getenv("DATABASE_URL")
init_db(DATABASE_URL)

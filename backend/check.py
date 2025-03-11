from db import engine
from sqlalchemy import text

with engine.connect() as connection:
    result = connection.execute(text("SELECT version();"))
    print("Connected to database:", result.fetchone())

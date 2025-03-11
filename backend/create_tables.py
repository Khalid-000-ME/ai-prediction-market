from db import engine, Base
from sqlalchemy import text, inspect

from models import Event, Bet, User  # Explicitly import all models

print("Tables to be created:", Base.metadata.tables.keys())  

print("Dropping all tables...")
Base.metadata.drop_all(bind=engine)

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created!")

# Explicitly check and confirm
with engine.connect() as connection:
    result = connection.execute(text("SELECT tablename FROM pg_tables WHERE schemaname='public';"))
    tables = result.fetchall()
    print("Existing tables:", tables)
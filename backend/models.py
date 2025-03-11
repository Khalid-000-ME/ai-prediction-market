from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    outcome = Column(Boolean, nullable=True)
    resolved = Column(Boolean, default=False)
    bets = relationship("Bet", back_populates="event")
    
class Bet(Base):
    __tablename__ = "bets"
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    user = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    prediction = Column(Boolean, nullable=False)
    event = relationship("Event", back_populates="bets")
    
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    wallet_address = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    
import db
db.Base.metadata.create_all(bind=db.engine)
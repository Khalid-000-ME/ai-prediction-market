from fastapi import APIRouter, HTTPException
from db import SessionLocal
from models import Event, Bet
from blockchain import event_listener
from ai import predict_event_outcome

router = APIRouter()

@router.post("/create_event/")
def create_event(description: str):
    db = SessionLocal()
    event = Event(description=description)
    db.add(event)
    db.commit()
    return {"message": "Event created", "event_id": event.id}

@router.get("/predict/{event_id}")
def get_prediction(event_id: int):
    db = SessionLocal()
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    prediction = predict_event_outcome(event.description)
    return {"event": event.description, "prediction": prediction}

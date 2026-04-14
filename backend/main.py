import os
import uuid
from datetime import datetime
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DBWinItem(Base):
    __tablename__ = "wins"
    id = Column(String, primary_key=True, index=True)
    text = Column(String)
    date = Column(String)

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WinItemCreate(BaseModel):
    text: str

class WinItemResponse(BaseModel):
    id: str
    text: str
    date: str

    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/items", response_model=list[WinItemResponse])
def get_items(db: Session = Depends(get_db)):
    return db.query(DBWinItem).all()

@app.post("/api/items", response_model=WinItemResponse)
def add_item(win: WinItemCreate, db: Session = Depends(get_db)):
    new_id = str(uuid.uuid4())
    today_date = datetime.now().strftime("%b %d, %Y")

    db_item = DBWinItem(id=new_id, text=win.text, date=today_date)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item

@app.delete("/api/items/{item_id}")
def delete_item(item_id: str, db: Session = Depends(get_db)):
    db_item = db.query(DBWinItem).filter(DBWinItem.id == item_id).first()

    if not db_item:
        raise HTTPException(status_code=404, detail="Win not found")

    db.delete(db_item)
    db.commit()
    return {"message": "Win deleted successfully"}
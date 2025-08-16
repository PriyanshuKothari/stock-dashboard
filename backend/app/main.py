from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import uvicorn

from .database import Base, engine, get_db
from .models import Company
from . import fetch_data

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Stock Dashboard API", version="1.0.0")

# Allow all origins for simplicity in demo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEFAULT_COMPANIES = [
    {"name": "Reliance Industries", "symbol": "RELIANCE.NS"},
    {"name": "Tata Consultancy Services", "symbol": "TCS.NS"},
    {"name": "HDFC Bank", "symbol": "HDFCBANK.NS"},
    {"name": "Infosys", "symbol": "INFY.NS"},
    {"name": "ICICI Bank", "symbol": "ICICIBANK.NS"},
    {"name": "State Bank of India", "symbol": "SBIN.NS"},
    {"name": "Bharti Airtel", "symbol": "BHARTIARTL.NS"},
    {"name": "Larsen & Toubro", "symbol": "LT.NS"},
    {"name": "Hindustan Unilever", "symbol": "HINDUNILVR.NS"},
    {"name": "Adani Enterprises", "symbol": "ADANIENT.NS"},
]

def ensure_seed(db: Session):
    if db.query(Company).count() == 0:
        for c in DEFAULT_COMPANIES:
            db.add(Company(name=c["name"], symbol=c["symbol"]))
        db.commit()

@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}

@app.get("/companies")
def list_companies(db: Session = Depends(get_db)) -> List[Dict[str, str]]:
    ensure_seed(db)
    rows = db.query(Company).order_by(Company.name).all()
    return [{"name": r.name, "symbol": r.symbol} for r in rows]

@app.get("/data/{symbol}")
def get_history(symbol: str, period: str = "6mo", interval: str = "1d") -> Dict[str, Any]:
    hist = fetch_data.fetch_history(symbol, period=period, interval=interval)
    stats = fetch_data.compute_stats(symbol)
    result = {"symbol": symbol, "history": hist["data"], "stats": stats}
    return result

# Simple linear regression prediction for next-day close using last 30 closes
@app.get("/predict/{symbol}")
def predict_next_day(symbol: str) -> Dict[str, Any]:
    import numpy as np
    from sklearn.linear_model import LinearRegression

    hist = fetch_data.fetch_history(symbol, period="3mo", interval="1d")
    closes = [d["close"] for d in hist["data"] if d["close"] == d["close"]]  # filter NaN
    if len(closes) < 10:
        raise HTTPException(status_code=400, detail="Not enough data to predict")

    y = np.array(closes[-30:]).reshape(-1, 1) if len(closes) >= 30 else np.array(closes).reshape(-1, 1)
    X = np.arange(len(y)).reshape(-1, 1)

    model = LinearRegression()
    model.fit(X, y)
    next_idx = np.array([[len(y)]])
    pred = float(model.predict(next_idx)[0][0])

    return {"symbol": symbol, "prediction_next_close": round(pred, 4), "points_used": int(len(y))}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

from .database import Base, engine, SessionLocal
from .models import Company

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

def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(Company).count() == 0:
            for c in DEFAULT_COMPANIES:
                db.add(Company(name=c["name"], symbol=c["symbol"]))
            db.commit()
            print("Seeded companies.")
        else:
            print("Companies already seeded.")
    finally:
        db.close()

if __name__ == "__main__":
    run()

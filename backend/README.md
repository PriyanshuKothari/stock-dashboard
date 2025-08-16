# Stock Dashboard Backend

FastAPI backend for Stock Market Dashboard.

## Features
- Serves company list, stock history, and statistics
- Predicts next-day close using Linear Regression
- SQLite database for storing company list
- Fallback mock data when live fetch fails

## Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Docker
```bash
docker build -t stock-backend .
docker run -p 8000:8000 stock-backend
```

## Endpoints
- `/companies`
- `/data/{symbol}`
- `/predict/{symbol}`

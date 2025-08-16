# Stock Dashboard Frontend

React + TailwindCSS frontend for Stock Market Dashboard.

## Features
- Sidebar with company search
- Interactive chart with line/area toggle
- Stats cards with animations
- Prediction confidence bar
- Mock news section
- Dark mode toggle

## Setup
```bash
cd frontend
npm install
npm start
```

## Docker
```bash
docker build -t stock-frontend .
docker run -p 3000:3000 stock-frontend
```

## Notes
Make sure the backend is running on port 8000 or update API base URLs in the frontend code.

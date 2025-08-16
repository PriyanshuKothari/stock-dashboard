
# 📊 Stock Market Dashboard

A full-stack stock market dashboard built with **FastAPI (Backend)** and **React + TailwindCSS (Frontend)**.  
Created for the JarNox Internship Assignment.


## 🚀 Features
- Real & mock stock data fetching
- Historical charts with interactive controls
- 52-week high/low, avg volume, and AI-based prediction
- Dark mode support
- Searchable company list
- Mock news feed
- Fully Dockerized for deployment

## 🛠 Tech Stack
**Backend:** FastAPI, SQLite, yfinance, scikit-learn  
**Frontend:** React, TailwindCSS, Chart.js, Heroicons  
**Deployment:** Docker, docker-compose, Render (backend), Vercel (frontend)
## 📂 Project Structure

```bash
  stock-dashboard/
    ├── backend/ # FastAPI backend
    ├── frontend/ # React frontend
    ├── docker-compose.yml
    └── README.md
```
## 🔧 Local Development

## Clone the repo
```bash
git clone https://github.com/yourusername/stock-dashboard.git
cd stock-dashboard
```
## Start with Docker
```bash
docker-compose up --build
```


 - Backend: http://localhost:8000

 - Frontend: http://localhost:3000
 



# 🌍 Deployment
 - Backend: Deploy [/backend to Render](https://stock-dashboard-backend-e9r7.onrender.com)

 - Frontend: Deploy [/frontend to Vercel](https://stock-dashboard-pearl.vercel.app/)

## Screenshots

### Company List
![Company_List](./screenshots/Company_List.jpeg)

### Dashboard Overview
![Dashboard](./screenshots/Dashboard.jpeg)

### Stats & Predictions
![Stats](./screenshots/Stats.jpeg)



## Development Note
### Development Approach
I started by setting up the backend using FastAPI to manage stock data and predictions. For storage, I chose SQLite, and I made sure to include a seeding feature so that the app always begins with a set list of companies. Then, I created several REST endpoints, like /companies, /data/{symbol}, and /predict/{symbol}, to make this information accessible. To wrap it all up, I containerized the backend with Docker and deployed it on Render.Next, I focused on the frontend and built a dashboard using ReactJS. It features a sidebar where users can see company names, a main chart panel for tracking stock trends, and statistic cards that display the 52-week highs and lows along with average volume. Additionally, there's a prediction widget that utilizes a basic linear regression model. For styling, I went with TailwindCSS to create a clean and professional-looking interface. The frontend was deployed on Vercel and linked to the Render backend.
### Technologies Used
- Backend: FastAPI, SQLAlchemy, SQLite, Uvicorn, yFinance, Scikit-learn, Docker

- Frontend: ReactJS, Chart.js, TailwindCSS, Vercel

- Deployment: Render (Backend), Vercel (Frontend), GitHub for version control
### Challenges Faced
- Handling CORS between backend and frontend deployments

- Managing SQLite persistence in Docker/Render (solved by auto-seeding companies)

- Ensuring clean UI/UX with responsive charts and stats

- Debugging deployment issues on Render (Docker build context, missing DB, etc.)


## Feedback

If you have any feedback, please reach out to us at priyanshukothari1808@gmail.com

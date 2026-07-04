# Crochet Shop — React + Node.js

## Structure
- `backend/` — Express API + serves built frontend
- `frontend/` — React app (Vite)

## Local development
Terminal 1:
    cd backend && npm install && npm start
Terminal 2:
    cd frontend && npm install && npm run dev
Visit http://localhost:5173

## Production build (run on your Windows/dev machine)
    cd frontend
    npm install
    npm run build
Copy the contents of frontend/dist into backend/public

## Run on server (EC2)
    cd backend
    npm install
    node server.js
Visit http://<your-ec2-ip>:5000

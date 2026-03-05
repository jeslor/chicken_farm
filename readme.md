# 🐔 Chicken Farm App

A fullstack web application for managing a virtual chicken farm. Built with Next.js (frontend), Express.js (backend), Prisma, and MongoDB. Easily track, add, and manage your flock with a beautiful dashboard and REST API.

---

## Features

- View all chickens in a dashboard with stats (hens, roosters, chicks, laying, newborns)
- Add new chickens with details (name, breed, type, color, age, weight, status, notes, newborn)
- Search and filter chickens by type or name/breed
- Delete chickens
- Responsive, modern UI (Next.js, Tailwind CSS)
- RESTful API (Express.js, Prisma, MongoDB)
- Dockerized for easy deployment

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/) (local or cloud, if not using Docker)

### 1. Clone the repository

```bash
git clone <repo-url>
cd chicken_farm
```

### 2. Environment Variables

- Copy and configure `.env` files for both frontend and backend:
  - `chicken_farm_backend/.env`
    - `DATABASE_URL="mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"`
  - `chicken_farm_frontend/.env`
    - `CHICKEN_BACKEND_API_URL="http://localhost:4000/api/chickens"`

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3232](http://localhost:3232)
- Backend API: [http://localhost:4000/api/chickens](http://localhost:4000/api/chickens)

### 4. Run Locally (Dev Mode)

#### Backend

```bash
cd chicken_farm_backend
npm install
npx prisma generate
npm run dev
```

#### Frontend

```bash
cd chicken_farm_frontend
npm install
npm run dev
```

- Visit [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

- `GET    /api/chickens` — List all chickens
- `POST   /api/chickens` — Add a new chicken
- `DELETE /api/chickens/:id` — Delete a chicken

### Chicken Model

```
id:        string
name:      string
breed:     string
type:      "hen" | "rooster" | "chick"
color:     string
ageWeeks:  number
weightKg:  number
status:    "healthy" | "sick" | "laying" | "brooding"
notes:     string
isNewborn: boolean
createdAt: Date
```

---

## Frontend Features

- Dashboard with stats and filters
- Add chicken form (with validation, newborn toggle)
- Delete chicken (with confirmation)
- Search by name or breed
- Responsive and mobile-friendly

---

## Development

- Lint: `npm run lint` (in each app)
- Format: `npm run format` (in each app)
- Prisma: `npx prisma studio` (backend)

---

## License

MIT

# Book-Easy

Backend API for managing clients and appointments. Built with Node.js, Express, and SQLite.

## Requirements

- Node.js 18+

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```env
JWT_SECRET=your_secret_key
PORT=3000
```

Start the server:

```bash
npm start       # production
npm run dev     # development with auto-reload
```

The server runs at `http://localhost:3000`.

## API Endpoints

### Auth

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|-------------|
| POST | `/auth/login` | No | Login, returns JWT token |
| POST | `/auth/logout` | Yes | Logout |

**Login request body:**
```json
{ "email": "user@example.com", "password": "secret" }
```

### Clients

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|-------------|
| GET | `/clients` | No | List all clients |
| POST | `/clients` | Yes | Create a new client |

**Create client request body:**
```json
{ "name": "Jane Doe", "email": "jane@example.com", "phone": "+372 555 1234" }
```

### Appointments

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|-------------|
| GET | `/appointments` | No | List all appointments |
| GET | `/appointments/:id` | No | Get appointment by ID |
| POST | `/appointments` | Yes | Create a new appointment |
| PUT | `/appointments/:id` | Yes | Update an appointment |
| DELETE | `/appointments/:id` | Yes | Delete an appointment |

**Create/update appointment request body:**
```json
{
  "clientId": 1,
  "service": "Haircut",
  "date": "2026-05-01",
  "time": "10:00",
  "status": "confirmed"
}
```

### Calendar

| Method | Endpoint | Auth required | Description |
|--------|----------|---------------|-------------|
| GET | `/calendar` | No | All appointments grouped by date |

## Authentication

Protected endpoints require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Obtain a token by calling `POST /auth/login`.

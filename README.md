# PrepTrack – Interview Preparation Tracker

PrepTrack is a full-stack web application designed to help students organize and track their interview preparation. It allows users to manage topics, monitor their progress, record practice sessions, and view overall preparation statistics.

## Features

* User registration and login
* JWT-based authentication
* Create, update, and delete preparation topics
* Categorize topics into DSA, Development, Aptitude, and Other
* Track topic status
* Record practice sessions
* Maintain practice history
* Dashboard with preparation statistics
* Track completed and remaining topics
* Responsive React-based frontend

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

## Project Structure

```text
PrepTrack/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/              # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Main Modules

### Authentication

Users can register and log in securely using JWT-based authentication. Passwords are encrypted using bcrypt before being stored.

### Topic Management

Users can create and manage preparation topics with information such as:

* Topic title
* Category
* Status
* Notes
* Practice count
* Last practiced date
* Practice history

### Dashboard

The dashboard provides an overview of preparation progress, including:

* Total topics
* Completed topics
* Topics remaining
* Total practice sessions
* Completion percentage
* Recently updated topics

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd PrepTrack
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The application will then be available through the local Vite development server.

## API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Topics

```text
POST   /api/topics
GET    /api/topics
PUT    /api/topics/:id
DELETE /api/topics/:id
```

### Practice

```text
POST /api/topics/:id/practice
```

All protected routes require a valid JWT authentication token.

## Future Improvements

* Interview question tracking
* Daily preparation tasks
* LinkedIn job tracking
* Interview reminders
* Progress charts and analytics
* Company-wise preparation tracking
* Resume management
* Deployment and production optimization

## Purpose

PrepTrack is built to provide a centralized platform for managing interview preparation and maintaining consistency throughout the preparation process.

## Status

Currently under development.

# TODOER

A simple TODO application built with FastAPI (Backend) and React (Frontend).

## Overview

This project is a monorepo containing a backend API built with FastAPI and a frontend single-page application built with React. It allows users to create, read, update (deadlines), and delete TODO items.

## Getting Started

This project uses Docker and Docker Compose for easy setup and deployment.

### Prerequisites

- Docker
- Docker Compose

### Setup

1. Clone the repository:
   ```bash
   # Replace with your repo clone command
   git clone <repository_url>
   cd TODOER
   ```

2. Build and run the Docker containers:
   ```bash
   docker-compose up --build
   ```

This will build the backend and frontend Docker images and start the services. The backend will be available at `http://localhost:8000` and the frontend at `http://localhost:3000` (or the port specified in `docker-compose.yml`).

## Usage

_To be added: Describe how to use the application once it is running._

## Project Structure

```
TODOER/
├── .gitignore
├── README.md
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── main.py
│   └── app/
│       ├── __init__.py
│       ├── api/
│       │   ├── __init__.py
│       │   └── todos.py
│       ├── crud/
│       │   ├── __init__.py
│       │   └── todos.py
│       └── models/
│           ├── __init__.py
│           └── todo.py
└── frontend/
    ├── .gitignore
    ├── Dockerfile
    ├── package.json
    ├── index.html
    ├── public/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── api/
        │   └── todos.js
        ├── components/
        │   ├── TodoList.jsx
        │   ├── TodoItem.jsx
        │   └── AddTodoForm.jsx
        └── hooks/
            └── useTodos.js
```

## Contributing

_To be added._

## License

_To be added._

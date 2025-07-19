# ToDoApp

## Project Overview

This repository contains a full-stack ToDo application built with ReactJS (TypeScript) for the frontend and C# (ASP.NET Core) for the backend. The app allows users to manage their tasks efficiently, with features such as deadlines, overdue highlighting, and persistent storage.

## Features
- Add tasks (minimum 10 characters)
- Set optional deadlines for tasks
- Overdue tasks are highlighted in red
- Tasks displayed in a table
- Mark tasks as done
- Delete tasks
- Persistent data storage
- Error handling and validation

## Tech Stack
- **Frontend:** ReactJS, TypeScript
- **Backend:** C# (ASP.NET Core Web API)
- **Data Storage:** (To be decided, e.g., SQLite, in-memory, or file-based)

## Setup Instructions

### Prerequisites
- Node.js & npm (for frontend)
- .NET 6+ SDK (for backend)

### Getting Started

#### 1. Clone the repository
```bash
git clone <repo-url>
cd ToDoApp
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
# Restore dependencies
 dotnet restore
# Run the backend server
 dotnet run
```

The backend API will be available at http://localhost:5000 (or the port shown in the terminal).

Swagger UI for API testing will be available at http://localhost:5000/swagger (in development mode).

## Development Plan
This project will be developed in the following steps:
1. Update README (current step)
2. Set up frontend skeleton (React + TypeScript)
3. Set up backend skeleton (C# ASP.NET Core)
4. Implement frontend task table and form
5. Implement backend data storage
6. Integrate frontend and backend
7. Add deadline and overdue logic
8. Polish, error handling, and final review

---

Feel free to reach out if you have any questions or suggestions!
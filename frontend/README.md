# Frontend - ToDoApp

This is the React + TypeScript frontend for the ToDoApp project.

## Features
- Add tasks (title > 10 characters, deadline required)
- Set deadline (defaults to today)
- Overdue tasks are highlighted and status shown
- Tasks displayed in a paginated table
- Mark tasks as done
- Delete tasks
- Persistent data storage (in-memory backend)
- Error handling and validation (frontend and backend)
- CORS enabled for development

## Pagination
- The backend supports pagination via `page` and `pageSize` query parameters.
- The frontend displays pagination controls and fetches tasks accordingly.

## CORS
- The backend is configured to allow any origin in development for easy frontend-backend integration.

## Backend Validation
- Task title must be longer than 10 characters
- Deadline is required
- All validation is enforced on both frontend and backend

## Production Notes / Further Improvements
- Use persistent storage (e.g., SQLite, PostgreSQL) instead of in-memory
- Add authentication and authorization
- Implement filtering and sorting
- Add unit and integration tests
- Use DTOs and mapping for API models
- Add logging, monitoring, and error tracking
- Rate limiting and security best practices
- API versioning

## Getting Started

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure
- `src/components/` - Reusable UI components
- `src/pages/` - Page-level components
- `src/types/` - TypeScript type definitions

## Notes
- This frontend connects to a C# backend (see main README for backend setup).
- Main features and UI are implemented as described above.

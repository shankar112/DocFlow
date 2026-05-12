# DocFlow - Collaborative Document Editor

A lightweight collaborative document editor built for an engineering assessment.

## Features
- **Monorepo Architecture**: Clean separation between `apps/frontend` and `apps/backend`.
- **Rich Text Editing**: Powered by TipTap with support for Bold, Italic, Headings, and Lists.
- **Persistent Storage**: SQLite database with SQLAlchemy ORM.
- **User Authentication**: Seeded users (`user1`, `user2`) with JWT-based auth.
- **Sharing Workflow**: Share documents between users with clear ownership distinction.
- **File Ingestion**: Support for uploading `.txt` and `.md` files.

## Tech Stack
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: FastAPI + SQLite + SQLAlchemy
- **Rich Text**: TipTap

## Setup & Running

### Backend
1. `cd apps/backend`
2. `pip install -r requirements.txt`
3. `uvicorn app.main:app --reload`
*Note: SQLite database is created automatically and seeded with `user1` and `user2` (password: `password123`).*

### Frontend
1. `cd apps/frontend`
2. `npm install`
3. `npm run dev`

## Architecture Reasoning
- **Monorepo**: Chosen for local setup simplicity and clear domain boundaries.
- **FastAPI**: Selected for its speed, automatic Swagger docs, and excellent Pydantic integration.
- **TipTap**: Provides the most flexible headless editor for React, allowing for a custom, assessment-friendly UI.
- **Vertical Slices**: Implementation followed vertical slices (CRUD -> Sharing -> Upload) to ensure independently testable features at each stage.

## Success Criteria Checklist
- [x] Working end-to-end CRUD flow
- [x] Functional rich text editing
- [x] Shareable documents
- [x] Persistent storage after refresh
- [x] Simple upload support (.txt/.md)
- [x] Clean architecture reasoning

# DocFlow - Collaborative Document Editor

A lightweight collaborative document editor built for an engineering assessment.

## Features
- **Monorepo Architecture**: Clean separation between `apps/frontend` and `apps/backend`.
- **Rich Text Editing**: Powered by TipTap with support for Bold, Italic, Headings, and Lists.
- **Persistent Storage**: SQLite database with SQLAlchemy ORM.
- **User Authentication**: Seeded users (`user1`, `user2`) with JWT-based auth.
- **Sharing Workflow**: Share documents between users with clear ownership distinction.
- **File Ingestion**: Support for uploading `.txt` and `.md` files.
- **Local Export**: Download documents as `.txt` files directly to your machine.

## Tech Stack
- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: FastAPI + SQLite + SQLAlchemy
- **Rich Text**: TipTap
- **Icons**: Lucide React

## Setup Instructions

### Backend Setup
1. `cd apps/backend`
2. `pip install -r requirements.txt`
3. `uvicorn app.main:app --reload`
*Note: The SQLite database is automatically initialized and seeded on first run.*

### Frontend Setup
1. `cd apps/frontend`
2. `npm install`
3. `npm run dev`

### Seeded Users
- **User 1**: `user1` / `password123`
- **User 2**: `user2` / `password123`

## Architecture Decisions
- **Vertical Slices**: Features were implemented end-to-end (UI to DB) to ensure every part of the system works together early.
- **Service Layer**: Business logic is separated into services in the backend to keep routes clean and testable.
- **JWT Auth**: Standard bearer token authentication to secure all document operations.

## Scope Decisions
- **Seeded Users Only**: To minimize setup friction, user registration was excluded in favor of pre-defined test accounts.
- **No WebSockets**: Prioritized reliable persistence and simple CRUD over the complexity of real-time multi-cursor editing.
- **Simple Sharing**: Sharing provides full edit access to keep the collaborative flow straightforward for the assessment.

## AI Workflow
- **Spec-First Development**: Used Gemini CLI to generate specifications and implementation plans before writing code.
- **Incremental Implementation**: Code was generated and reviewed in small, verifiable chunks.
- **Automated Refactoring**: Leveraged AI for rapid integration of TipTap and Tailwind components while manually validating styling and UX.

## Known Limitations
- **Single Format Export**: Downloads are currently limited to `.txt` format.
- **Concurrent Edits**: Since there are no WebSockets, if two users edit simultaneously, the last save will overwrite previous changes.
- **No Search**: Document list is currently a flat list without search or filtering.

## Future Improvements
- **Markdown Export**: Expand the download feature to support `.md` and `.pdf`.
- **Real-time Sync**: Implement WebSockets for live collaborative editing.
- **Folder Support**: Add document organization through folders or tags.
- **Revision History**: Track and revert changes to documents over time.

# DocFlow Architecture Note

## System Overview
DocFlow is structured as a lightweight monorepo with a clear separation of concerns between the client and server.

- **Frontend:** React (Vite) + TypeScript + Tailwind CSS
- **Backend:** Python (FastAPI) + SQLite + SQLAlchemy

## Key Technical Decisions

1. **Rich Text Editor Integration (TipTap)**
   - *Why?* TipTap is headless and highly customizable. It allowed me to build a clean UI with Tailwind without fighting a pre-styled editor's CSS, keeping the aesthetic consistent with the rest of the application.

2. **SQLite + SQLAlchemy**
   - *Why?* SQLite provides zero-configuration persistence, which is ideal for a portable assessment submission. SQLAlchemy ORM ensures that if the project were to scale, swapping to PostgreSQL would be trivial.

3. **Stateless JWT Authentication**
   - *Why?* Standard Bearer tokens are easy to implement, secure, and scale well without requiring server-side session management.

4. **Monolithic API with Service Layer**
   - *Why?* I separated business logic (e.g., `document_service.py`) from routing logic (`document_routes.py`). This ensures the routes remain clean and the business logic is highly testable.

## Tradeoffs Made
- **Concurrency vs. Complexity:** I chose a "last-write-wins" approach for document saving rather than implementing WebSockets. This allowed me to deliver a stable, polished, and deep feature set for rich-text editing, file ingestion, and sharing within the time limit.

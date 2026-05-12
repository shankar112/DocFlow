# Implementation Plan: DocFlow MVP

**Branch**: `001-docflow-mvp` | **Date**: 2026-05-12 | **Spec**: [specs/001-docflow-mvp/spec.md](spec.md)

## Summary
Build a lightweight collaborative document editor with persistent storage, rich text support, and basic sharing. The architecture will follow a monorepo structure with a FastAPI backend and a React/Vite frontend.

## Technical Context

**Language/Version**: TypeScript (Frontend), Python 3.12 (Backend)  
**Primary Dependencies**: React, Vite, Tailwind, TipTap (Frontend); FastAPI, SQLAlchemy, Pydantic (Backend)  
**Storage**: SQLite (stored in `apps/backend/sql_app.db`)  
**Testing**: Pytest (Backend), Vitest (Frontend)  
**Target Platform**: Local Windows/Linux Environment  
**Project Type**: Monorepo Web Application  
**Performance Goals**: <200ms P95 API response time, <500ms initial page load  
**Constraints**: Monorepo structure, no real-time collaboration, no websockets  
**Scale/Scope**: MVP for assessment, seeded users only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Depth Over Breadth**: Focus on robust CRUD and reliable persistence.
- [x] **II. Scoped Architecture**: No unnecessary microservices or complex RBAC.
- [x] **III. Practical Execution**: Local SQLite and simple file upload.
- [x] **IV. Validated AI Acceleration**: All code generated will be manually reviewed.
- [x] **V. Maintainability & Clarity**: Standard monorepo layout with clear boundaries.

## Project Structure

### Documentation (this feature)

```text
specs/001-docflow-mvp/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API endpoints)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
apps/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── database.py
│   │   └── main.py
│   ├── requirements.txt
│   └── sql_app.db
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── features/
    │   ├── pages/
    │   ├── services/
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

**Structure Decision**: Monorepo with `apps/frontend` and `apps/backend`. This aligns with the technical constraints and keeps boundaries clear.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

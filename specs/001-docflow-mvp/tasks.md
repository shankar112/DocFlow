# Tasks: DocFlow MVP

**Input**: Design documents from `specs/001-docflow-mvp/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/api.md

**Organization**: Tasks are grouped by execution phase and user story to enable vertical slices and independent testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: Maps to US1, US2, US3 from spec.md

---

## Phase 1: Setup (Project & Environment)

**Purpose**: Project initialization and monorepo structure

- [x] T001 Create monorepo structure with apps/frontend and apps/backend
- [x] T002 [P] Initialize FastAPI project in apps/backend/ and create requirements.txt
- [x] T003 [P] Initialize Vite + React + TypeScript + Tailwind project in apps/frontend/

---

## Phase 2: Foundational (Infrastructure & Auth)

**Purpose**: Core infrastructure needed for all user stories

- [x] T004 Setup SQLAlchemy models for User, Document, and Share in apps/backend/app/models/
- [x] T005 [P] Implement database connection and SQLite session management in apps/backend/app/database.py
- [x] T006 Implement lightweight Auth service with seeded users and JWT in apps/backend/app/services/auth_service.py
- [x] T007 [P] Setup basic API routing and CORS in apps/backend/app/main.py

---

## Phase 3: User Story 1 - Core Document Editing (Priority: P1) 🎯 MVP

**Goal**: Create, edit, rename, and reopen documents with rich text and persistence.

**Independent Test**: Login as seeded user, create document, add bold text, reload page, verify content and name persist.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create Document List and Header UI components in apps/frontend/src/components/
- [x] T009 [US1] Implement Document schemas (Pydantic) in apps/backend/app/schemas/document.py
- [x] T010 [US1] Implement Document Service (CRUD logic) in apps/backend/app/services/document_service.py
- [x] T011 [US1] Implement Document API routes (GET, POST, PUT, DELETE) in apps/backend/app/routes/document_routes.py
- [x] T012 [US1] Implement Dashboard page with document list and "Create" action in apps/frontend/src/pages/DashboardPage.tsx
- [x] T013 [US1] Integrate TipTap editor component in apps/frontend/src/features/document-editor/components/DocumentEditor.tsx
- [x] T014 [US1] Implement Document Editor page with auto-save/persistence integration in apps/frontend/src/pages/DocumentEditorPage.tsx

**Checkpoint**: Core document lifecycle (CRUD + Rich Text) is functional and persistent.

---

## Phase 4: User Story 3 - Basic Document Sharing (Priority: P2)

**Goal**: Share documents with other users and distinguish ownership.

**Independent Test**: Share a document from user1 to user2, login as user2, verify document appears in "Shared" section and is editable.

### Implementation for User Story 3

- [x] T015 [P] [US3] Implement Sharing service logic and Share API endpoint in apps/backend/app/routes/document_routes.py
- [x] T016 [US3] Implement Sharing Panel UI in apps/frontend/src/features/sharing/components/SharingPanel.tsx
- [x] T017 [US3] Update Dashboard UI to distinguish between "Owned" and "Shared" documents (FR-007)

**Checkpoint**: Documents can be shared between seeded users with clear UI distinction.

---

## Phase 5: User Story 2 - File Upload (Priority: P2)

**Goal**: Import .txt and .md files into DocFlow documents.

**Independent Test**: Upload a .md file from the dashboard and verify it opens as a new document with correct content.

### Implementation for User Story 2

- [x] T018 [US2] Implement file upload endpoint for .txt/.md in apps/backend/app/routes/document_routes.py
- [x] T019 [US2] Create FileUploadDropzone component and integrate into Dashboard in apps/frontend/src/features/file-upload/components/FileUploadDropzone.tsx

**Checkpoint**: Users can import existing notes into the system.

---

## Phase 6: Polish & Walkthrough (Final Phase)

**Purpose**: Quality assurance, documentation, and demo readiness.

- [x] T020 Implement global error handling and user-friendly toast notifications in apps/frontend/src/App.tsx
- [x] T021 Finalize README.md with setup instructions and architecture notes
- [x] T022 [P] Create a `start.sh` or `docker-compose.yml` for simple one-command startup
- [x] T023 Prepare a 5-minute walkthrough script covering all MVP features

---

## Dependencies & Execution Order

1. **Setup (Phase 1)** -> **Foundational (Phase 2)**: Sequential setup.
2. **Foundational (Phase 2)** -> **User Story 1 (Phase 3)**: Blocks core CRUD.
3. **User Story 1 (Phase 3)** -> **User Story 3 & 2 (Phases 4-5)**: Stories depend on the base Document CRUD.
4. **Phases 4 & 5**: Can be done in parallel if needed.

## Implementation Strategy

### MVP First (Vertical Slice)
Focus on completing **Phase 1 through Phase 3** first. This delivers the core "Doc" in DocFlow.

### Assessment Efficiency
- **Vertical Slices**: Each story is implemented end-to-end (Frontend + Backend) before moving to the next.
- **Seeded Users**: Don't waste time on registration; use the pre-defined users from `quickstart.md`.
- **Minimal Abstraction**: Use standard FastAPI and React patterns to avoid debugging complex custom frameworks.

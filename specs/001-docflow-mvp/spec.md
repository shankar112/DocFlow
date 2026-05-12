# Feature Specification: DocFlow MVP

**Feature Branch**: `001-docflow-mvp`  
**Created**: 2026-05-12  
**Status**: Draft  
**Input**: User description: "Define the MVP product scope for DocFlow. Required Features: - Lightweight login using seeded/mock users - Create, rename, edit, and reopen documents - Rich text editing: - bold - italic - underline - headings - bullet/numbered lists - File upload: - .txt and .md only - Basic document sharing between users - Owned vs shared document distinction - Persistent storage using SQLite Explicit Non-Goals: - Realtime collaboration - CRDT/OT systems - Commenting - Notifications - Complex permissions - AI-powered editing - Full Google Docs parity Prioritize: - usability - coherent UX - reliable persistence - clean implementation"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Core Document Editing (Priority: P1)

As a user, I want to create, name, and edit documents with rich text formatting so that I can capture my thoughts effectively.

**Why this priority**: This is the core value proposition of DocFlow. Without document creation and editing, the application has no purpose.

**Independent Test**: Can be tested by logging in, creating a document, adding rich text, and verifying it persists after a reload.

**Acceptance Scenarios**:

1. **Given** I am logged in, **When** I click "Create New Document", **Then** a new untitled document is created and opened in the editor.
2. **Given** I have a document open, **When** I apply bold formatting to text and save, **Then** the text remains bold when I reopen the document.
3. **Given** I am on the dashboard, **When** I rename an existing document, **Then** the new name is reflected in the document list.

---

### User Story 2 - File Upload (Priority: P2)

As a user, I want to upload existing .txt or .md files so that I can quickly import my existing notes into DocFlow.

**Why this priority**: Enhances usability by allowing users to bring in external content without manual copy-pasting.

**Independent Test**: Can be tested by selecting a valid .txt or .md file from the local machine and verifying its content appears in a new DocFlow document.

**Acceptance Scenarios**:

1. **Given** I am on the dashboard, **When** I upload a .md file, **Then** a new document is created with the file's content.
2. **Given** I attempt to upload a .pdf file, **When** I select it, **Then** the system shows an error message indicating only .txt and .md are supported.

---

### User Story 3 - Basic Document Sharing (Priority: P2)

As a user, I want to share my documents with other users so that we can collaborate on the same content.

**Why this priority**: Enables the collaborative aspect of DocFlow, even without real-time editing.

**Independent Test**: Can be tested by sharing a document with another seeded user and verifying it appears in their "Shared with Me" section.

**Acceptance Scenarios**:

1. **Given** I own a document, **When** I share it with User B, **Then** User B can see and edit the document.
2. **Given** I am viewing the dashboard, **When** I look at the document list, **Then** I can clearly distinguish between documents I own and documents shared with me.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a lightweight login mechanism using seeded/mock users.
- **FR-002**: System MUST allow users to create, rename, edit, and reopen documents.
- **FR-003**: System MUST support rich text editing (bold, italic, underline, headings, bullet/numbered lists) via TipTap.
- **FR-004**: System MUST persist all document data and metadata in a SQLite database.
- **FR-005**: System MUST support uploading .txt and .md files, converting them into documents.
- **FR-006**: System MUST allow document owners to share documents with other registered users.
- **FR-007**: System MUST distinguish between "Owned" and "Shared" documents in the UI.

### Key Entities

- **User**: Represents a system user (seeded). Attributes: id, username, password_hash.
- **Document**: Represents a text document. Attributes: id, title, content (HTML/JSON), owner_id, created_at, updated_at.
- **Share**: Represents a sharing relationship. Attributes: id, document_id, user_id (recipient), permission_level (default: edit).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create and save a new document in under 15 seconds (excluding typing content).
- **SC-002**: 100% of rich text formatting (bold, italic, etc.) is preserved after document save and reload.
- **SC-003**: Documents shared with another user appear in their shared list within 1 second of the action.
- **SC-004**: System correctly rejects any file upload that is not .txt or .md.

## Assumptions

- Users have a modern web browser supporting React and TipTap.
- The SQLite database will be stored locally on the server.
- Seeded users are sufficient for the assessment scope; no self-registration required.
- "Sharing" implies full edit access for now, as complex permissions are a non-goal.

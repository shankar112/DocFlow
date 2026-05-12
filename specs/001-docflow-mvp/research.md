# Research: DocFlow MVP

## TipTap React Integration
**Decision**: Use `@tiptap/react` with `StarterKit` for core rich text functionality.
**Rationale**: TipTap is highly customizable and plays well with React. `StarterKit` provides Bold, Italic, Lists, and Headings out of the box.
**Alternatives**: Quill (less flexible), Slate (higher complexity).

## FastAPI Backend Architecture
**Decision**: Use FastAPI with SQLAlchemy (SQLite) using a service-layer pattern.
**Rationale**: Service layer keeps routes clean and business logic centralized. SQLite is perfect for assessment-level persistence without setup overhead.
**Alternatives**: Django (too heavy), Express (no native Pydantic-like validation).

## Monorepo Management
**Decision**: Simple directory-based monorepo (manual orchestration).
**Rationale**: For a two-app assessment, Nx or Turbo adds unnecessary complexity. Standard shell scripts or just `cd` is sufficient.
**Alternatives**: Turborepo (overkill for this scale).

## File Upload Handling
**Decision**: FastAPI `UploadFile` for `.txt` and `.md` ingestion.
**Rationale**: Efficient and easy to validate MIME types/extensions. Content will be read and saved as the initial state of a new Document entity.
**Alternatives**: Frontend-only reading (possible, but backend ingestion allows for better validation and centralized logic).

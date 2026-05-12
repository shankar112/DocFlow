# DocFlow Constitution

## Core Principles

### I. Depth Over Breadth
Focus on delivering a few high-quality, fully functional features rather than many shallow ones. Implementation must be complete and robust within the defined scope.

### II. Scoped Architecture
Keep the architecture intentionally simple and scoped. Avoid premature abstractions and enterprise patterns that don't serve the immediate needs of the project.

### III. Practical Execution
Favor working, maintainable code over "perfect" but incomplete implementations. The system should be easy to run locally and review.

### IV. Validated AI Acceleration
Leverage AI tools for rapid development, but manually validate every output to ensure technical integrity and adherence to standards.

### V. Maintainability & Clarity
Optimize for reviewer clarity and local setup simplicity. Code should be readable and follow idiomatic patterns for the chosen stack.

## Technical Constraints

- **Frontend**: React + Vite + TypeScript + Tailwind
- **Backend**: FastAPI + SQLite
- **Editor**: TipTap (Rich Text)
- **Structure**: Monorepo with `apps/frontend` and `apps/backend`
- **Exclusions**: No real-time collaboration, websockets, or advanced RBAC.

## Engineering Priorities

1. Stable document editing flow
2. Reliable persistence (SQLite)
3. Clear sharing workflow
4. Clean deployment and documentation
5. Clear architecture reasoning

## Governance

- All changes must align with these core principles.
- Complexity must be justified by immediate requirements.
- The constitution is the primary reference for architectural decisions.

**Version**: 1.0.0 | **Ratified**: 2026-05-12 | **Last Amended**: 2026-05-12

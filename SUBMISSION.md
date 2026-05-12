# DocFlow Submission Overview

## Included in this folder:
1. `apps/` - The source code (Frontend and Backend monorepo)
2. `README.md` - Local setup and run instructions
3. `ARCHITECTURE.md` - A short architecture note explaining technical decisions
4. `AI_WORKFLOW.md` - A note explaining how AI was utilized during development
5. `VIDEO_LINK.txt` - A text file containing the URL to the walkthrough video
6. `screenshots/` - (Folder) Screenshots of the working application

## Live Links
- **Live Deployment:** https://doc-flow-seqx.vercel.app

## Testing Credentials
- Username: `user1` | Password: `password123`
- Username: `user2` | Password: `password123`

## Feature Status
### What is working:
- **Authentication:** Login with seeded users.
- **Rich Text Editing:** Full text editing using TipTap (Bold, Italic, Headings, Lists).
- **File Upload:** Ingestion of `.txt` and `.md` files into the editor.
- **Sharing:** Users can share documents with other usernames, granting them full edit access.
- **Export:** Users can download their edited documents locally as `.txt` files.
- **Persistence:** SQLite database persisting users, documents, and sharing relations.

### What is incomplete / Intentional Scope Cuts:
- **User Registration:** Cut to prioritize core editor features. We rely on seeded users.
- **Real-time Collaboration (WebSockets):** Cut due to time constraints. If two users edit at the exact same time, the last save overwrites.
- **Advanced Permissions:** Sharing currently grants full edit access; there is no "Read Only" mode.

### What I would build next with another 2-4 hours:
1. **Real-time Sync:** Implement WebSockets (using FastAPI WebSockets or Socket.io) to allow true multi-cursor collaborative editing.
2. **Version History:** Track document revisions so users can view and restore previous states.
3. **Enhanced Markdown Export:** Allow exporting directly to `.md` or `.pdf` formats rather than just plain text.

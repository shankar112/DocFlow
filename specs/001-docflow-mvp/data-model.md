# Data Model: DocFlow MVP

## Entities

### User
Represents a seeded user in the system.
- `id`: Integer (Primary Key)
- `username`: String (Unique)
- `hashed_password`: String

### Document
Represents a rich-text document.
- `id`: Integer (Primary Key)
- `title`: String
- `content`: Text (HTML/JSON representation from TipTap)
- `owner_id`: Integer (Foreign Key -> User.id)
- `created_at`: DateTime
- `updated_at`: DateTime

### Share
Represents a document sharing relationship.
- `id`: Integer (Primary Key)
- `document_id`: Integer (Foreign Key -> Document.id)
- `user_id`: Integer (Foreign Key -> User.id) - The recipient of the share

## Relationships
- User (1) <-> (N) Document (Owned)
- Document (1) <-> (N) Share
- User (1) <-> (N) Share (Received)

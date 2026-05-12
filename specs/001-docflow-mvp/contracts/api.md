# API Contracts: DocFlow MVP

## Authentication
### `POST /api/auth/login`
- **Request**: `{ "username": "...", "password": "..." }`
- **Response**: `{ "access_token": "...", "token_type": "bearer" }`

## Documents
### `GET /api/documents`
- **Description**: Returns all documents owned by or shared with the user.
- **Response**: `[ { "id": 1, "title": "...", "owner_id": 1, "is_shared": false }, ... ]`

### `POST /api/documents`
- **Description**: Create a new document.
- **Request**: `{ "title": "..." }`
- **Response**: Document object.

### `POST /api/documents/upload`
- **Description**: Create a document from a file upload (.txt, .md).
- **Request**: Multipart/form-data with `file`.
- **Response**: Document object.

### `GET /api/documents/{id}`
- **Response**: Detailed document object including content.

### `PUT /api/documents/{id}`
- **Request**: `{ "title": "...", "content": "..." }`
- **Response**: Updated document object.

### `DELETE /api/documents/{id}`
- **Description**: Delete a document (owner only).

## Sharing
### `POST /api/documents/{id}/share`
- **Request**: `{ "username": "..." }`
- **Response**: `{ "status": "shared" }`

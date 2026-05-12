from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os

from ..database import get_db
from ..schemas.document import Document, DocumentCreate, DocumentUpdate, Share, ShareCreate
from ..services import document_service, auth_service
from ..models.user import User

router = APIRouter(prefix="/api/documents", tags=["documents"])

@router.get("/", response_model=List[Document])
def read_documents(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_service.get_current_user)
):
    return document_service.get_documents(db, user_id=current_user.id, skip=skip, limit=limit)

@router.post("/", response_model=Document)
def create_document(
    document: DocumentCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_service.get_current_user)
):
    return document_service.create_document(db=db, document=document, owner_id=current_user.id)

@router.get("/{document_id}", response_model=Document)
def read_document(
    document_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_service.get_current_user)
):
    db_document = document_service.get_document(db, document_id=document_id, user_id=current_user.id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found or access denied")
    return db_document

@router.put("/{document_id}", response_model=Document)
def update_document(
    document_id: int, 
    document: DocumentUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_service.get_current_user)
):
    db_document = document_service.update_document(db, document_id=document_id, document=document, user_id=current_user.id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found or access denied")
    return db_document

@router.delete("/{document_id}")
def delete_document(
    document_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_service.get_current_user)
):
    success = document_service.delete_document(db, document_id=document_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found or you are not the owner")
    return {"detail": "Document deleted"}

@router.post("/{document_id}/share")
def share_document(
    document_id: int, 
    share_data: dict, 
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_service.get_current_user)
):
    # Verify current user is owner
    db_document = db.query(document_service.Document).filter(
        document_service.Document.id == document_id, 
        document_service.Document.owner_id == current_user.id
    ).first()
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found or you are not the owner")
    
    # Find recipient by username
    recipient = db.query(User).filter(User.username == share_data.get("username")).first()
    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient user not found")
    
    # Create share
    share_create = ShareCreate(user_id=recipient.id, permission="edit")
    return document_service.create_share(db=db, document_id=document_id, share=share_create)

@router.post("/upload", response_model=Document)
async def upload_document(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),
    current_user: User = Depends(auth_service.get_current_user)
):
    if not file.filename.endswith(('.txt', '.md')):
        raise HTTPException(status_code=400, detail="Only .txt and .md files are allowed")
    
    content = await file.read()
    try:
        text_content = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="Invalid file encoding")

    document_create = DocumentCreate(title=file.filename, content=text_content)
    return document_service.create_document(db=db, document=document_create, owner_id=current_user.id)

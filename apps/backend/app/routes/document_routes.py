from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os

from ..database import get_db
from ..schemas.document import Document, DocumentCreate, DocumentUpdate, Share, ShareCreate
from ..services import document_service

router = APIRouter(prefix="/documents", tags=["documents"])

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.get("/", response_model=List[Document])
def read_documents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return document_service.get_documents(db, skip=skip, limit=limit)

@router.post("/", response_model=Document)
def create_document(document: DocumentCreate, db: Session = Depends(get_db)):
    return document_service.create_document(db=db, document=document)

@router.get("/{document_id}", response_model=Document)
def read_document(document_id: int, db: Session = Depends(get_db)):
    db_document = document_service.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_document

@router.put("/{document_id}", response_model=Document)
def update_document(document_id: int, document: DocumentUpdate, db: Session = Depends(get_db)):
    db_document = document_service.update_document(db, document_id=document_id, document=document)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_document

@router.delete("/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    success = document_service.delete_document(db, document_id=document_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"detail": "Document deleted"}

@router.post("/{document_id}/share", response_model=Share)
def share_document(document_id: int, share: ShareCreate, db: Session = Depends(get_db)):
    db_document = document_service.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return document_service.create_share(db=db, document_id=document_id, share=share)

@router.post("/upload", response_model=Document)
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(('.txt', '.md')):
        raise HTTPException(status_code=400, detail="Only .txt and .md files are allowed")
    
    content = await file.read()
    try:
        text_content = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="Invalid file encoding")

    document_create = DocumentCreate(title=file.filename, content=text_content)
    return document_service.create_document(db=db, document=document_create)

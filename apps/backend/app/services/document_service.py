from sqlalchemy.orm import Session
from ..models.document import Document, Share
from ..schemas.document import DocumentCreate, DocumentUpdate, ShareCreate

def get_documents(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Document).offset(skip).limit(limit).all()

def get_document(db: Session, document_id: int):
    return db.query(Document).filter(Document.id == document_id).first()

def create_document(db: Session, document: DocumentCreate):
    db_document = Document(title=document.title, content=document.content)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def update_document(db: Session, document_id: int, document: DocumentUpdate):
    db_document = get_document(db, document_id)
    if db_document:
        update_data = document.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_document, key, value)
        db.commit()
        db.refresh(db_document)
    return db_document

def delete_document(db: Session, document_id: int):
    db_document = get_document(db, document_id)
    if db_document:
        db.delete(db_document)
        db.commit()
        return True
    return False

def create_share(db: Session, document_id: int, share: ShareCreate):
    db_share = Share(**share.model_dump(), document_id=document_id)
    db.add(db_share)
    db.commit()
    db.refresh(db_share)
    return db_share

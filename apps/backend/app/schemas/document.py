from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List, Optional

class ShareBase(BaseModel):
    recipient_email: str
    permission: str

class ShareCreate(ShareBase):
    pass

class Share(ShareBase):
    id: int
    document_id: int
    
    model_config = ConfigDict(from_attributes=True)

class DocumentBase(BaseModel):
    title: str
    content: str

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class Document(DocumentBase):
    id: int
    created_at: datetime
    updated_at: datetime
    shares: List[Share] = []

    model_config = ConfigDict(from_attributes=True)

from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List, Optional

class ShareBase(BaseModel):
    user_id: int
    permission: str = "edit"

class ShareCreate(ShareBase):
    pass

class Share(ShareBase):
    id: int
    document_id: int
    
    model_config = ConfigDict(from_attributes=True)

class DocumentBase(BaseModel):
    title: str
    content: Optional[str] = ""

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class Document(DocumentBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    shares: List[Share] = []

    model_config = ConfigDict(from_attributes=True)

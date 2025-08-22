from pydantic import BaseModel
import datetime
from typing import List

# Schema for a single message in a response
class MessageOut(BaseModel):
    id: int
    text: str
    sender: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

# Schema for a conversation in a response
class ConversationOut(BaseModel):
    id: int
    title: str
    user_id: int
    created_at: datetime.datetime
    messages: List[MessageOut] = []

    class Config:
        from_attributes = True
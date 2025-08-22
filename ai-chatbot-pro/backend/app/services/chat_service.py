from sqlalchemy.orm import Session, joinedload
from app.models.conversation import Conversation, Message

def get_user_conversations(db: Session, user_id: int):
    return (
        db.query(Conversation)
        .options(joinedload(Conversation.messages))
        .filter(Conversation.user_id == user_id)
        .order_by(Conversation.created_at.desc())
        .all()
    )

def create_conversation(db: Session, user_id: int, title: str = "New Chat"):
    db_conversation = Conversation(title=title, user_id=user_id)
    db.add(db_conversation)
    db.commit()
    db.refresh(db_conversation)
    
    initial_message = Message(
        text="Hello! How can I help you today?",
        sender="assistant",
        conversation_id=db_conversation.id
    )
    db.add(initial_message)
    db.commit()
    db.refresh(db_conversation)
    return db_conversation

def update_conversation_title(db: Session, conversation_id: int, title: str, user_id: int):
    db_conversation = db.query(Conversation).filter(Conversation.id == conversation_id, Conversation.user_id == user_id).first()
    if db_conversation:
        db_conversation.title = title
        db.commit()
        db.refresh(db_conversation)
    return db_conversation

def delete_conversation(db: Session, conversation_id: int, user_id: int):
    db_conversation = db.query(Conversation).filter(Conversation.id == conversation_id, Conversation.user_id == user_id).first()
    if db_conversation:
        db.delete(db_conversation)
        db.commit()
    return db_conversation

# --- THIS IS THE CRITICAL FIX ---
# This new version safely deletes all conversations and their associated messages.
def delete_all_user_conversations(db: Session, user_id: int):
    """Safely deletes all conversations for a specific user."""
    # First, fetch all conversations owned by the user.
    conversations_to_delete = db.query(Conversation).filter(Conversation.user_id == user_id).all()
    
    # Loop through and delete each one to ensure all related messages are also deleted.
    for conversation in conversations_to_delete:
        db.delete(conversation)
        
    db.commit()
# --- END OF FIX ---

def create_message(db: Session, conversation_id: int, text: str, sender: str, user_id: int):
    conversation = db.query(Conversation).filter(Conversation.id == conversation_id, Conversation.user_id == user_id).first()
    if not conversation:
        return None
    
    if conversation.title == "New Chat" and sender == "user":
        update_conversation_title(db, conversation_id, text[:40], user_id)
    
    db_message = Message(text=text, sender=sender, conversation_id=conversation_id)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
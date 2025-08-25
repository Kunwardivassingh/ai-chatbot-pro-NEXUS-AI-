# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# import os
# import json
# import httpx
# import google.generativeai as genai
# from typing import List

# from app.core.config import settings
# from app.db.session import SessionLocal
# from app.models.user import User
# from app.api.endpoints.users import get_current_user
# from app.services import chat_service
# from app.schemas.chat import MessageCreate
# from app.schemas.conversation import ConversationOut, MessageOut 

# router = APIRouter()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # --- AI and Search Configuration ---
# genai.configure(api_key=settings.GEMINI_API_KEY)
# model = genai.GenerativeModel('gemini-1.5-pro-latest')
# # This is the AI model used for generating responses
# # --- RESTORING THE AI BRAIN ---

# async def get_intent(user_message: str) -> dict:
#     """Uses Gemini to determine the user's intent."""
#     prompt = f"""
#     Analyze the user's message and determine the intent.
#     The possible intents are "CHAT" or "OPEN_WEBSITE".
#     If the intent is "OPEN_WEBSITE", extract the name of the website.
#     Respond with a clean JSON object only.

#     Examples:
#     - User: "hello there" -> {{"intent": "CHAT"}}
#     - User: "what is the capital of France?" -> {{"intent": "CHAT"}}
#     - User: "open youtube" -> {{"intent": "OPEN_WEBSITE", "website": "YouTube"}}
#     - User: "can you open wikipedia for me" -> {{"intent": "OPEN_WEBSITE", "website": "Wikipedia"}}

#     User message: "{user_message}"
#     """
#     try:
#         response = model.generate_content(prompt)
#         json_response = response.text.strip().replace("`", "").replace("json", "")
#         return json.loads(json_response)
#     except Exception as e:
#         print(f"Error getting intent: {e}")
#         return {"intent": "CHAT"}

# async def find_website_url(website_name: str) -> str | None:
#     """Uses Google Search API to find the official URL for a website."""
#     url = "https://www.googleapis.com/customsearch/v1"
#     params = {
#         "key": settings.SEARCH_API_KEY,
#         "cx": settings.SEARCH_ENGINE_ID,
#         "q": f"official website for {website_name}"
#     }
#     async with httpx.AsyncClient() as client:
#         try:
#             response = await client.get(url, params=params)
#             response.raise_for_status()
#             results = response.json()
#             if "items" in results and len(results["items"]) > 0:
#                 return results["items"][0]["link"]
#         except Exception as e:
#             print(f"Error during search: {e}")
#     return None

# async def get_chat_response(user_message: str) -> str:
#     """Gets a standard conversational response from Gemini."""
#     prompt = f"You are Nexus AI, a helpful assistant. Answer the following question: {user_message}"
#     try:
#         response = model.generate_content(prompt)
#         return response.text
#     except Exception as e:
#         print(f"Error getting AI response: {e}")
#         return "Sorry, I encountered an error while processing your request."

# # --- END OF RESTORING THE AI BRAIN ---


# @router.get("/conversations", response_model=List[ConversationOut])
# def get_conversations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     return chat_service.get_user_conversations(db, user_id=current_user.id)

# @router.delete("/conversations", status_code=status.HTTP_204_NO_CONTENT)
# def delete_all_conversations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     chat_service.delete_all_user_conversations(db, user_id=current_user.id)
#     return

# @router.post("/conversations", response_model=ConversationOut)
# def create_new_conversation(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     return chat_service.create_conversation(db, user_id=current_user.id)

# @router.delete("/conversations/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
# def delete_a_conversation(conversation_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     chat_service.delete_conversation(db, conversation_id=conversation_id, user_id=current_user.id)
#     return

# # --- THIS IS THE FINAL, UPGRADED CHAT ENDPOINT ---
# @router.post("/conversations/{conversation_id}/messages")
# async def create_new_message(
#     conversation_id: int,
#     message: MessageCreate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     # 1. Save the user's message
#     chat_service.create_message(db, conversation_id, message.text, "user", current_user.id)
    
#     # 2. Determine the user's intent
#     intent_data = await get_intent(message.text)
#     intent = intent_data.get("intent")

#     # 3. Act based on the intent
#     if intent == "OPEN_WEBSITE":
#         website_name = intent_data.get("website")
#         if not website_name:
#             ai_response_text = "I can open a website for you, but which one?"
#             ai_msg = chat_service.create_message(db, conversation_id, ai_response_text, "assistant", current_user.id)
#             return {"type": "chat", "message": ai_msg}

#         url = await find_website_url(website_name)
#         if url:
#             ai_response_text = f"Opening {website_name}..."
#             ai_msg = chat_service.create_message(db, conversation_id, ai_response_text, "assistant", current_user.id)
#             return {"type": "url", "url": url, "message": ai_msg}
#         else:
#             ai_response_text = f"I'm sorry, I couldn't find the website for {website_name}."
#             ai_msg = chat_service.create_message(db, conversation_id, ai_response_text, "assistant", current_user.id)
#             return {"type": "chat", "message": ai_msg}
    
#     else: # Default to CHAT intent
#         ai_response_text = await get_chat_response(message.text)
#         ai_msg = chat_service.create_message(db, conversation_id, ai_response_text, "assistant", current_user.id)
#         if not ai_msg:
#             raise HTTPException(status_code=404, detail="Conversation not found or access denied")
#         return {"type": "chat", "message": ai_msg}


######################################
################################
################################
#new




from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import os
import json
import httpx
import google.generativeai as genai
from typing import List

from app.core.config import settings
from app.db.session import SessionLocal
from app.models.user import User
from app.api.endpoints.users import get_current_user
from app.services import chat_service
from app.schemas.chat import MessageCreate
from app.schemas.conversation import ConversationOut, MessageOut 

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- AI and Search Configuration ---
genai.configure(api_key=settings.GEMINI_API_KEY)

# combo setup: first try pro, if quota exceeded -> fallback to free
MODEL_PRO = "gemini-2.5-flash-lite"
MODEL_FREE = "gemini-2.0-flash-lite"
model = genai.GenerativeModel(MODEL_PRO)

# --- helper: get quota usage ---
async def get_quota_info():
    """Fetches current quota usage and limits from Gemini API."""
    try:
        async with httpx.AsyncClient() as client:
            url = "https://generativelanguage.googleapis.com/v1beta/models"
            params = {"key": settings.GEMINI_API_KEY}
            resp = await client.get(url, params=params)
            if resp.status_code == 200:
                return resp.json()
            else:
                return {"error": resp.text}
    except Exception as e:
        return {"error": str(e)}

# --- RESTORING THE AI BRAIN ---

async def get_intent(user_message: str) -> dict:
    """Uses Gemini to determine the user's intent."""
    prompt = f"""
    Analyze the user's message and determine the intent.
    The possible intents are "CHAT" or "OPEN_WEBSITE".
    If the intent is "OPEN_WEBSITE", extract the name of the website.
    Respond with a clean JSON object only.

    Examples:
    - User: "hello there" -> {{"intent": "CHAT"}}
    - User: "what is the capital of France?" -> {{"intent": "CHAT"}}
    - User: "open youtube" -> {{"intent": "OPEN_WEBSITE", "website": "YouTube"}}
    - User: "can you open wikipedia for me" -> {{"intent": "OPEN_WEBSITE", "website": "Wikipedia"}}

    User message: "{user_message}"
    """
    try:
        response = model.generate_content(prompt)
        json_response = response.text.strip().replace("`", "").replace("json", "")
        return json.loads(json_response)
    except Exception as e:
        print(f"Error getting intent: {e}")
        return {"intent": "CHAT"}

async def find_website_url(website_name: str) -> str | None:
    """Uses Google Search API to find the official URL for a website."""
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": settings.SEARCH_API_KEY,
        "cx": settings.SEARCH_ENGINE_ID,
        "q": f"official website for {website_name}"
    }
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params)
            response.raise_for_status()
            results = response.json()
            if "items" in results and len(results["items"]) > 0:
                return results["items"][0]["link"]
        except Exception as e:
            print(f"Error during search: {e}")
    return None

async def get_chat_response(user_message: str) -> str:
    """Gets a standard conversational response from Gemini."""
    prompt = f"You are Nexus AI, a helpful assistant. Answer the following question: {user_message}"
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Primary model failed, retrying with fallback: {e}")
        try:
            # fallback to free model if pro quota is exceeded
            fallback_model = genai.GenerativeModel(MODEL_FREE)
            response = fallback_model.generate_content(prompt)
            return response.text + "  \n\n(Note: switched to free model due to quota limits)"
        except Exception as e2:
            print(f"Error getting AI response: {e2}")
            return "Sorry, I encountered an error while processing your request."

# --- END OF RESTORING THE AI BRAIN ---


@router.get("/conversations", response_model=List[ConversationOut])
def get_conversations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return chat_service.get_user_conversations(db, user_id=current_user.id)

@router.delete("/conversations", status_code=status.HTTP_204_NO_CONTENT)
def delete_all_conversations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    chat_service.delete_all_user_conversations(db, user_id=current_user.id)
    return

@router.post("/conversations", response_model=ConversationOut)
def create_new_conversation(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return chat_service.create_conversation(db, user_id=current_user.id)

@router.delete("/conversations/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_a_conversation(conversation_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    chat_service.delete_conversation(db, conversation_id=conversation_id, user_id=current_user.id)
    return

# --- THIS IS THE FINAL, UPGRADED CHAT ENDPOINT ---
@router.post("/conversations/{conversation_id}/messages")
async def create_new_message(
    conversation_id: int,
    message: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. Save the user's message
    chat_service.create_message(db, conversation_id, message.text, "user", current_user.id)
    
    # 2. Determine the user's intent
    intent_data = await get_intent(message.text)
    intent = intent_data.get("intent")

    # 3. Act based on the intent
    if intent == "OPEN_WEBSITE":
        website_name = intent_data.get("website")
        if not website_name:
            ai_response_text = "I can open a website for you, but which one?"
            ai_msg = chat_service.create_message(db, conversation_id, ai_response_text, "assistant", current_user.id)
            return {"type": "chat", "message": ai_msg}

        url = await find_website_url(website_name)
        if url:
            ai_response_text = f"Opening {website_name}..."
            ai_msg = chat_service.create_message(db, conversation_id, ai_response_text, "assistant", current_user.id)
            return {"type": "url", "url": url, "message": ai_msg}
        else:
            ai_response_text = f"I'm sorry, I couldn't find the website for {website_name}."
            ai_msg = chat_service.create_message(db, conversation_id, ai_response_text, "assistant", current_user.id)
            return {"type": "chat", "message": ai_msg}
    
    else: # Default to CHAT intent
        ai_response_text = await get_chat_response(message.text)
        ai_msg = chat_service.create_message(db, conversation_id, ai_response_text, "assistant", current_user.id)
        if not ai_msg:
            raise HTTPException(status_code=404, detail="Conversation not found or access denied")
        return {"type": "chat", "message": ai_msg}

# --- EXTRA: Endpoint to check quota usage ---
@router.get("/quota")
async def quota_status():
    return await get_quota_info()
# --- EXTRA: Endpoint to check quota usage ---
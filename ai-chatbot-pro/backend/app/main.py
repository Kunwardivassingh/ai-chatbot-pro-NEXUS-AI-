from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, users, chat # Import the new chat router
from app.core.logging_config import logger

logger.info("--- Nexus AI Server is starting up ---")
app = FastAPI(title="Nexus AI")

app.add_middleware(
    CORSMiddleware,
 # --- THIS IS THE FIX ---
    # Allow all origins, which is perfect for development.
    allow_origins=["*"],
    # --- END OF FIX ---  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("Including routers...")
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"]) # Add the chat router
logger.info("Routers included successfully.")

@app.get("/")
def read_root():
    return {"Hello": "From Nexus AI"}

logger.info("--- Nexus AI Server startup sequence complete ---")
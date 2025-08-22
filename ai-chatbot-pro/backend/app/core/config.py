from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # This will automatically load all variables from your .env file
    DATABASE_URL: str
    GEMINI_API_KEY: str
    # We will use these later, but it's good practice to define them here
    SEARCH_API_KEY: str
    SEARCH_ENGINE_ID: str
    SECRET_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
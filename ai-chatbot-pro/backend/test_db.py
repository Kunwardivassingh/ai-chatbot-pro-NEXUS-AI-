import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

print("Attempting to test database connection...")

try:
    load_dotenv()
    db_url = os.getenv("DATABASE_URL")

    if not db_url:
        print("\n--- ERROR ---")
        print("DATABASE_URL not found in .env file.")
        print("Please make sure your .env file is in the 'backend' folder and contains the correct URL.")
    else:
        print(f"Found DATABASE_URL: {db_url}")
        engine = create_engine(db_url)

        with engine.connect() as connection:
            print("Connecting to the database...")
            connection.execute(text("SELECT 1"))
            print("\n--- SUCCESS ---")
            print("Database connection is working correctly!")

except Exception as e:
    print("\n--- CONNECTION FAILED ---")
    print("An error occurred:")
    print(e)
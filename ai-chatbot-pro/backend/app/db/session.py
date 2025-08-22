# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from app.core.config import settings

# # Create the database engine from the URL in your settings
# engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

# # Create a configured "Session" class
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Create the database engine from the URL in your settings
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    # Add connection arguments to handle sleeping databases
    connect_args={"connect_timeout": 30}
)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
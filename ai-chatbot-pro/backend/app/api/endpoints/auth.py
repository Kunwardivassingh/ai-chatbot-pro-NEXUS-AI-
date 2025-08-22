# from fastapi import APIRouter, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordRequestForm
# from sqlalchemy.orm import Session
# from datetime import timedelta

# from app.schemas.user import UserCreate, UserOut
# from app.services import user_service
# from app.db.session import SessionLocal
# from app.core.security import verify_password, create_access_token

# router = APIRouter()

# # Dependency to get a DB session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
# def register_user(user: UserCreate, db: Session = Depends(get_db)):
#     db_user = user_service.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already registered",
#         )
#     return user_service.create_user(db=db, user=user)

# @router.post("/login")
# def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = user_service.get_user_by_email(db, email=form_data.username) # The form sends email as 'username'
#     if not user or not verify_password(form_data.password, user.hashed_password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect email or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=30)
#     access_token = create_access_token(
#         subject=user.email, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}


from fastapi import APIRouter, Depends, HTTPException, status
# --- THIS IS THE MISSING LINE ---
from fastapi.security import OAuth2PasswordRequestForm 
# --- END OF FIX ---
from sqlalchemy.orm import Session
from datetime import timedelta

from app.schemas.user import UserCreate, UserOut
from app.services import user_service
from app.db.session import SessionLocal
from app.core.security import verify_password, create_access_token
from app.core.logging_config import logger

router = APIRouter()

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    logger.info(f"Registration attempt for email: {user.email}")
    
    try:
        logger.info("Checking if user already exists...")
        db_user = user_service.get_user_by_email(db, email=user.email)
        
        if db_user:
            logger.warning(f"Registration failed: Email '{user.email}' already registered.")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )
        
        logger.info(f"User with email '{user.email}' does not exist. Proceeding with creation.")
        
        logger.info("Calling create_user service...")
        new_user = user_service.create_user(db=db, user=user)
        logger.info(f"Successfully created user with ID: {new_user.id}")
        
        return new_user

    except Exception as e:
        logger.exception("An unexpected error occurred during user registration.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An internal server error occurred.",
        )

@router.post("/login")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # The form sends the email in a field called 'username' by default
    user = user_service.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


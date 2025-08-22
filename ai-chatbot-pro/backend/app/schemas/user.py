from pydantic import BaseModel, EmailStr

# Schema for creating a new user (input)
class UserCreate(BaseModel):
    full_name: str # ADD THIS LINE
    email: EmailStr
    password: str

# Schema for reading a user from the database (output)
class UserOut(BaseModel):
    id: int
    full_name: str # ADD THIS LINE
    email: EmailStr

    class Config:
        from_attributes = True
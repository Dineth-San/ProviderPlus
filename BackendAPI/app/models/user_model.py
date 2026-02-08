from beanie import Document, Indexed
from pydantic import Field, EmailStr
from datetime import datetime
from enum import Enum
from typing import Optional


# define roles inside the app
class UserRole(str, Enum):
    CUSTOMER = "customer"
    PROVIDER = "provider"
    ADMIN = "admin"


# user is generalized, representing customer, provider and admin
class User(Document):

    # mandatory fields
    # Indexed(str, unique=True) -> mongoDB will throw an error if 2 people use the same email
    email: Indexed(EmailStr, unique=True)
    password_hash: str

    # profile info
    full_name: str
    phone_number: Optional[str] = None

    # system fields
    role: UserRole = UserRole.CUSTOMER
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # provider linking - if the user is a provider, we store their provider profile id here
    provider_profile_id: Optional[str] = None

    # this creates a 'users' collection in MongoDB
    class Settings:
        name = "users"

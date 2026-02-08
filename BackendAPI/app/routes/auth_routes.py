from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from ..models.user_model import UserRole
# from ..services import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])


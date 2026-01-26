from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services import ai_service
from ..models.ai_schemas import AppointmentDetails, UpdatedSummary

router = APIRouter()

"""
DUMMY MODELS TO REPRESENT REVIEWS AND CHAT LOGS
"""
# --- INPUT MODELS (What the Frontend sends us) ---
class ChatLog(BaseModel):
    messages: str

class ReviewData(BaseModel):
    current_summary: str
    new_review: str
    reviewer_name: str
"""
DUMMY MODELS END HERE
"""


# --- ENDPOINT 1: Analyze Appointment ---
@router.post("/analyze-appointment", response_model=AppointmentDetails)
async def analyze_appointment_route(chat: ChatLog):

    result = ai_service.extract_appointment_details(chat.messages)
    return result


# --- ENDPOINT 2: Summarize Review ---
@router.post("/summarize-review", response_model=UpdatedSummary)
async def summarize_review_route(data: ReviewData):

    result = ai_service.generate_review_summary(data.current_summary, data.new_review)
    return result
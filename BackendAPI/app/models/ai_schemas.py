from pydantic import BaseModel
from typing import Optional

"""
THIS FILE HAS ALL THE RESPONSE MODELS THAT ARE RELATED TO THE AI
(OTHER THAN THE CHATBOT) 
"""

# --- 1. Appointment Analysis Models ---
class AppointmentDetails(BaseModel):
    found: bool
    date: Optional[str] = None
    time: Optional[str] = None
    service_type: Optional[str] = None
    summary: str

# --- 2. Review Summarizer Models ---
class UpdatedSummary(BaseModel):
    new_summary: str
    sentiment: str  # "Positive", "Negative", "Neutral"
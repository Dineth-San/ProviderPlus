from ..core.gemini_config import client, MODEL_NAME
from ..models.ai_schemas import AppointmentDetails, UpdatedSummary
from datetime import datetime


# this function summarizes chats to create booking details
def extract_appointment_details(chat_history: str) -> AppointmentDetails:
    # Get today's date dynamically. this is to give GEMINI more context about the situation
    today_str = datetime.now().strftime("%Y-%m-%d (%A)")

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=f"Analyze this chat history:\n{chat_history}",
            config={
                "system_instruction": f"""
                You are an Appointment Scheduler AI.
                Analyze the chat log between a Client and a Provider.
                
                CONTEXT:
                - Today's date is: {today_str}
                - You must calculate relative dates (e.g., "this Sunday", "next week") based on today.

                GOAL: Extract proposed OR agreed appointment details.
                
                RULES:
                1. 'found': Set to TRUE if a specific date/time is mentioned, even if it's just a request.
                2. 'date': Convert relative terms to YYYY-MM-DD. 
                   - Example: If today is Friday 2025-01-10 and user says "this Sunday", output "2025-01-12".
                3. 'time': Extract the specific time mentioned.
                   - If user says "before 5pm", output "05:00 PM".
                   - If user says "morning", output "09:00 AM" (default).
                4. 'summary': A short sentence describing the job.
                """,
                "response_mime_type": "application/json",
                "response_schema": AppointmentDetails,
            }
        )
        return response.parsed

    except Exception as e:
        print(f"AI Error: {e}")
        return AppointmentDetails(found=False, summary="Error analyzing chat.")



# this function updates profile summaries based on new reviews given to providers
def generate_review_summary(current_summary: str, new_review: str) -> UpdatedSummary:
    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=f"Current Summary: {current_summary}\nNew Review: {new_review}",
            config={
                "system_instruction": """
                You are a Reputation Manager.
                Update the 'Current Summary' of a service provider by blending in the 'New Review'.
                
                GOAL: Create a cohesive, descriptive paragraph (approx 30-50 words) that reads naturally.
                
                RULES FOR HANDLING CONFLICTS:
                1. Do NOT say "Contradicts previous review".
                2. Instead, SYNTHESIZE the difference.
                   - If prices vary (High vs Low), say: "Pricing appears flexible depending on the job" or "Fees may vary."
                   - If timing varies (Late vs On-time), say: "Punctuality is generally good, though occasional delays happen."
                   - If behavior varies, say: "Service is usually friendly, with mixed reports on..."
                
                3. 'sentiment': Detect if the NEW review is Positive, Negative, or Neutral.
                """,
                "response_mime_type": "application/json",
                "response_schema": UpdatedSummary,
            }
        )
        return response.parsed

    except Exception as e:
        print(f"AI Error: {e}")
        return UpdatedSummary(new_summary=current_summary, sentiment="Unknown")
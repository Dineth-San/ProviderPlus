from pydantic import BaseModel
from typing import List, Optional

"""
THIS FILE HAS ALL THE RESPONSE MODELS RELATED TO THE CHATBOT
"""

class SearchKeywords(BaseModel):
    keywords: List[str]
    needs_clarification: bool = False
    clarification_question: Optional[str] = None

class SearchQuery(BaseModel):
    user_text: str
    context_history: Optional[str] = None

class SearchFilter(BaseModel):
    category: str
    keywords: list[str]

class AgentResponse(BaseModel):
    # Conversational logic
    reply_to_user: str
    needs_clarification: bool = False
    clarification_question: Optional[str] = None

    # Search logic
    search_filters: list[SearchFilter]
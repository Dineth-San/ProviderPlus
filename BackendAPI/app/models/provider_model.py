from beanie import Document
from typing import List

"""
THIS FILE HAS ALL THE RESPONSE MODELS THAT ARE RELATED TO THE DATABASE
"""

class Provider(Document):
    name: str
    category: str
    description: str
    tags: List[str] = []
    rating: float = 0.0
    contact_info: str = "No contact info"

    class Settings:
        name = "providers"
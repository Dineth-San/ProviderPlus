from beanie import Document, Link
from typing import List
from .category_model import Category

"""
THIS FILE HAS ALL THE RESPONSE MODELS THAT ARE RELATED TO THE DATABASE
"""

class Provider(Document):
    name: str
    category: Link[Category]
    description: str
    tags: List[str] = []
    rating: float = 0.0
    contact_info: str = "No contact info"

    class Settings:
        name = "providers"

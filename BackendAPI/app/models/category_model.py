from beanie import Document

class Category(Document):
    name: str
    slug: str
    icon: str
    translation_key: str

    class Settings:
        name = "Categories"

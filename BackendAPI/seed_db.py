import asyncio
import os
import sys

# --- FIX: FORCE PATH TO ROOT ---
current_path = os.path.dirname(os.path.abspath(__file__))
root_path = os.path.abspath(os.path.join(current_path, '.'))
sys.path.append(root_path)
# -------------------------------

from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from dotenv import load_dotenv

# Import Models
from app.models.provider_model import Provider
from app.models.category_model import Category

# Import Data
from app.data.mock_categories import FRONTEND_CATEGORIES, CATEGORY_MAPPING
from app.data.mock_providers import MOCK_PROVIDERS

async def seed():
    # 1. Connect to DB
    load_dotenv()
    uri = os.getenv("MONGO_URL")
    if not uri:
        print("❌ Error: MONGO_URL not found in .env")
        return

    client = AsyncIOMotorClient(uri)
    # Ensure database name matches what you use in your app
    # If your previous error said "providerplus_db", keep it.
    database = client.providerplus_db

    await init_beanie(database=database, document_models=[Category, Provider])

    # 2. Clear Old Data
    print("🗑️  Clearing old database...")
    await Category.delete_all()
    await Provider.delete_all()

    # 3. Seed Categories
    print("✨ Seeding Categories...")
    category_map = {} # To store "slug" -> "Category Object"

    for cat_data in FRONTEND_CATEGORIES:
        # Create the category document
        new_cat = await Category(
            name=cat_data['name'],
            slug=cat_data['slug'],
            icon=cat_data['icon'],
            # --- FIX: ADD THIS LINE ---
            translation_key=cat_data['name']
        ).create()

        # Save to map for later use
        category_map[cat_data['slug']] = new_cat

    print(f"✅ Created {len(category_map)} categories.")

    # 4. Seed Providers
    print("✨ Seeding Providers...")
    count = 0

    for p_data in MOCK_PROVIDERS:
        # Get the text category (e.g., "Photographer")
        raw_cat = p_data.get("category")

        # Find the correct slug (e.g., "Photographer" -> "photography")
        # If not found in map, fallback to lowercasing it
        slug = CATEGORY_MAPPING.get(raw_cat)
        if not slug:
            slug = raw_cat.lower().replace(" ", "-")

        # Get the actual Category Object from DB map
        category_obj = category_map.get(slug)

        if category_obj:
            # Create Provider with the LINKED category
            await Provider(
                name=p_data['name'],
                category=category_obj, # <--- PASSING THE OBJECT, NOT A LIST
                description=p_data['description'],
                tags=p_data['tags'],
                rating=p_data['rating']
            ).create()
            count += 1
        else:
            print(f"⚠️ SKIPPING {p_data['name']}: Category slug '{slug}' not found in database.")

    print(f"✅ Successfully seeded {count} providers!")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(seed())

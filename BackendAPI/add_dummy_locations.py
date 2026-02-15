import asyncio
import random
import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from dotenv import load_dotenv

# Force path to find your app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models.provider_model import Provider
from app.models.category_model import Category

# COORDINATES: Colombo, Sri Lanka
# We will scatter providers around this point
BASE_LAT = 6.9271
BASE_LON = 79.8612

async def add_locations():
    load_dotenv()
    # Connect to DB
    client = AsyncIOMotorClient(os.getenv("MONGO_URL", "mongodb://localhost:27017"))
    db = client.providerplus_db
    await init_beanie(database=db, document_models=[Provider, Category])

    providers = await Provider.find_all().to_list()
    print(f"🌍 Updating {len(providers)} providers with random locations...")

    for p in providers:
        # Create a random offset (approx 5-10km range)
        lat_offset = random.uniform(-0.05, 0.05)
        lon_offset = random.uniform(-0.05, 0.05)

        p.location = {
            "type": "Point",
            "coordinates": [BASE_LON + lon_offset, BASE_LAT + lat_offset]
        }
        await p.save()
        print(f"   📍 {p.name} -> moved to [{BASE_LON + lon_offset:.4f}, {BASE_LAT + lat_offset:.4f}]")

    print("\n✅ All providers located! Restart your server to build the index.")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(add_locations())

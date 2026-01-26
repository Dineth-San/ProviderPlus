import asyncio
from app.core.database  import init_db
from  app.models.provider_model import Provider
from app.data.mock_db import MOCK_PROVIDERS


async def seed():
    print("⏳ Connecting to MongoDB...")
    await init_db()

    print(f"🌱 Seeding {len(MOCK_PROVIDERS)} providers...")

    for data in MOCK_PROVIDERS:
        # 1. Clean data (remove old ID)
        clean_data = {k: v for k, v in data.items() if k != "id"}

        existing_provider = await Provider.find_one(Provider.name == clean_data["name"])

        if existing_provider:
            # Update existing
            await existing_provider.update({"$set": clean_data})
            print(f"   🔄 Updated: {clean_data['name']}")
        else:
            # Create new
            await Provider(**clean_data).insert()
            print(f"   ✨ Created: {clean_data['name']}")

    print("✅ Seed Complete!")

if __name__ == "__main__":
    asyncio.run(seed())
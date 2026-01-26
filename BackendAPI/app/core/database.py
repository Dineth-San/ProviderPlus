import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from dotenv import load_dotenv
from ..models.provider_model import Provider
from pymongo.errors import ServerSelectionTimeoutError

# function that connects the app with MongoDB
async def init_db():

    load_dotenv()
    # MongoDB URL
    uri = os.getenv("MONGO_URL")

    if not uri:
        raise ValueError("MONGO_URL not found!")

    try:
        # create the motor client
        client = AsyncIOMotorClient(uri)

        # select db name
        database = client.providerplus_db

        await init_beanie(
            database=database,
            document_models=[
                # add the response models the database returns
                Provider
            ]
        )
    # handling relevant errors
    except ServerSelectionTimeoutError as e:
        print("DB connection error. Could not connect to thee MongoDB Cloud")
        print("Check your internet connection")
        raise e

    # handling errors that might unexpectedly occur
    except Exception as e:
        print("An unexpected error occurred.")
        raise e

    print("MongoDB connection established")
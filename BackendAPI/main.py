from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.routes import chat_routes, analysis_routes
from app.core.database import init_db
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager


# DB startup/shutdown logic
@asynccontextmanager
async def lifespan(app: FastAPI):
    # start
    print("starting provider+ database")
    await init_db()
    yield

    # shutdown
    print("shutting down")


app = FastAPI(lifespan=lifespan)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"An unexpected error occurred {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "ai_reply": "I am currently experiencing an internal system error. Please try again later",
            "providers": [],
            "error_details": str(exc)
        }
    )

# --- ADD THIS BLOCK ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows ALL origins (perfect for dev/viva)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)
# ----------------------


app.include_router(chat_routes.router, prefix="/api/ai-chat", tags=["AI Chat"])
app.include_router(analysis_routes.router, prefix="/api/ai-integration", tags=["AI Integration"])


@app.get("/")
def read_root():
    return {"message: Provider+ backend is running!"}


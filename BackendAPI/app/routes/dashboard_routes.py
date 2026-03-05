"""
dashboard_routes.py
────────────────────
FastAPI router for the Provider Dashboard AI Overview endpoint.

Register in main.py:
    from app.routes.dashboard_routes import router as dashboard_router
    app.include_router(dashboard_router)
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from ..services.dashboard_service import generate_provider_overview

router = APIRouter(prefix="/api/gemini", tags=["Provider Dashboard AI"])


# ── Request / Response Models ──────────────────────────────────

class ProviderOverviewRequest(BaseModel):
    provider_id: str
    provider_name: str
    job_role: str
    completed_jobs_today: int = 0
    upcoming_jobs: int = 0
    rating: float = 0.0
    country: Optional[str] = "Sri Lanka"


class ProviderOverviewResponse(BaseModel):
    overview: str
    provider_id: str
    status: str = "success"


# ── Routes ─────────────────────────────────────────────────────

@router.post("/provider-overview", response_model=ProviderOverviewResponse)
def get_provider_overview(request: ProviderOverviewRequest):
    """
    Generate an AI-powered overview for the provider dashboard.
    Returns cached version if called within 10 minutes, otherwise generates fresh.
    """
    try:
        overview_text = generate_provider_overview(
            provider_id=request.provider_id,
            provider_name=request.provider_name,
            job_role=request.job_role,
            completed_jobs_today=request.completed_jobs_today,
            upcoming_jobs=request.upcoming_jobs,
            rating=request.rating,
            country=request.country or "Sri Lanka",
        )

        return ProviderOverviewResponse(
            overview=overview_text,
            provider_id=request.provider_id,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")


@router.get("/dashboard-health")
def dashboard_health_check():
    """Quick health check for the dashboard AI endpoint."""
    return {"status": "ok", "service": "dashboard-ai"}
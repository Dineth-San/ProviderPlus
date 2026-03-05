from fastapi import APIRouter, HTTPException
from typing import List, Optional

from ..models.category_model import Category
from ..services.search_service import get_providers_by_slug, get_all_categories, get_category_names
from ..models.provider_model import Provider

router = APIRouter()


@router.get("/providers/category/{slug}")
async def find_providers_by_category(slug: str, lat: Optional[float] = None, long: Optional[float] = None):
    """
    frontend: /providers/category/electrician
    backend: returns list of electricians
    """
    providers = await get_providers_by_slug(slug, user_lat=lat, user_long=long)

    if not providers:
        raise HTTPException(status_code=404, detail="No providers found in this category")

    return providers


@router.get("/categories", response_model=List[Category])
async def get_all_categories_full_endpoint():
    categories = await get_all_categories()

    if not categories:
        raise HTTPException(status_code=404, detail="No categories found")

    return categories


@router.get("/category-names", response_model=list[str])
async def get_category_names_endpoint():
    names = await get_category_names()

    if not names:
        raise HTTPException(status_code=404, detail="No category names found")

    return names


# ── Provider Dashboard Stats ──────────────────────────────────

@router.get("/provider/{provider_id}/dashboard")
async def get_provider_dashboard(provider_id: str):
    """
    Returns dashboard stats for the provider.
    Pulls real data from MongoDB where available,
    returns defaults for features not yet built.

    Frontend: GET /api/provider/{provider_id}/dashboard
    """
    try:
        # Try to fetch the provider from MongoDB
        provider = await Provider.get(provider_id)
    except Exception:
        provider = None

    if provider:
        # Real data from DB
        provider_rating = provider.rating
        provider_name = provider.name
    else:
        # Fallback for dev/testing (e.g. "provider_001" doesn't exist in DB yet)
        provider_rating = 4.8
        provider_name = "Provider"

    # Return dashboard data
    # TODO: Replace hardcoded values as you build each feature
    return {
        "completedJobs": 0,          # TODO: count from Jobs collection when built
        "upcomingJobs": 0,            # TODO: count from Jobs collection when built
        "notifications": 0,           # TODO: count from Notifications collection when built
        "rating": provider_rating,    # REAL: pulled from Provider document
        "totalReviews": 0,            # TODO: count from Reviews collection when built
        "customerResponses": 0,       # TODO: count from Messages collection when built
        "reSchedules": 0,             # TODO: count from Reschedules collection when built
    }
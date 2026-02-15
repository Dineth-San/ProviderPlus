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

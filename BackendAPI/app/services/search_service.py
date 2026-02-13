from ..models.provider_model import Provider
from ..models.category_model import Category

async def specialized_providers(category: str, keywords: list[str]):
    # 1. Fetch all providers with their Category Links populated
    # We use the raw query workaround we learned earlier to ensure it works
    providers = await Provider.find_all().to_list()

    # 2. Manual "Join" to get category names
    # (Since we can't trust fetch_links right now)
    results = []

    # Pre-fetch all categories for fast lookup
    all_categories = await Category.find_all().to_list()
    cat_map = {cat.id: cat.name for cat in all_categories}

    for provider_obj in providers:
        # Resolve the category name
        cat_name = "Unknown"
        if provider_obj.category and provider_obj.category.ref.id in cat_map:
            cat_name = cat_map[provider_obj.category.ref.id]

        # 3. Use the RESOLVED name for matching
        if not is_match(category, cat_name):
            continue

        # ... (Rest of your scoring logic remains the same) ...
        provider = provider_obj.dict()

        # Calculate Score
        score = 0
        provider_text = (
                provider.get("description",  "") + " " +
                " ".join(provider.get("tags", []))
        ).lower()

        for kw in keywords:
            kw_clean = kw.lower()
            if (kw_clean in provider_text) or (provider_text in kw_clean):
                score += 1

        # Add result
        # Note: We convert ID to string for JSON compatibility
        provider['_id'] = str(provider_obj.id)
        # Add the category name back so the AI can read it
        provider['category'] = cat_name

        results.append({**provider, "score": score + (10 if score > 0 else 1)})

    results.sort(key=lambda x: (x["score"], x.get("rating", 0)), reverse=True)
    return results


# this function gets all the valid categories to give GEMINI a list of available provider categories
async def get_category_names() -> list[str]:
    """
    Returns ONLY a list of strings: ['Plumber', 'Electrician', ...].
    Uses MongoDB 'distinct' for maximum performance (no unused data transferred).
    """
    # This queries MongoDB directly for just the values in the "name" column
    categories = await Category.find_all().to_list()
    return [cat.name for cat in categories]


async def get_all_categories() -> list[Category]:
    """
    Fetches all unique categories currently in the database.
    """
    return await Category.find_all().to_list()


async def get_providers_by_slug(slug: str):
    """
    Finds a category by its slug, then returns all providers linked to it
    """
    category = await Category.find_one({"slug": slug})

    if not category:
        return []

    providers = await Provider.find(
        {"category.$id": category.id}
    ).to_list()

    for provider in providers:
        provider.category = category

    return providers


# this is a logic function
def is_match(ai_category: str, db_category: str) -> bool:
    """
    Smart matching helper:
    1. Ignores Case (lower vs upper)
    2. Ignores extra spaces
    3. Handles Singular/Plural (Plumber vs Plumbers)
    """
    a = ai_category.lower().strip()
    b = db_category.lower().strip()
    # Check exact, singular, or start-of-word match
    return (a == b) or (a.rstrip('s') == b.rstrip('s')) or (b.startswith(a)) or (a.startswith(b))

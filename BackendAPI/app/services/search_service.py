from ..models.provider_model import Provider

async def specialized_providers(category: str, keywords: list[str]):
    """
    :param category: the broad category of the provider
    :param keywords: categories found by the AI after the initial prompt
    :return: providers that perform the specialized task
    """
    # get all providers to a list
    providers = await Provider.find_all().to_list()
    results = []

    for provider_obj in providers:

        provider = provider_obj.dict()
        p_category = provider.get("category", "Unknown")

        if not is_match(category, p_category):
            continue

        # a score is kept to give the user the most relevant provider for their job
        score = 0
        provider_text = (
                provider.get("description",  "") + " " +
                " ".join(provider.get("tags", []))
        ).lower()

        # this variable is used for debugging purposes
        matched_keywords = []
        for kw in keywords:
            kw_clean = kw.lower()
            if (kw_clean in provider_text) or (provider_text in kw_clean):
                score += 1
                matched_keywords.append(kw)

        if score > 0:
            provider['id'] = str(provider_obj.id)
            results.append({**provider, "score": score+10})
        else:
            provider['id'] = str(provider_obj.id)
            results.append({**provider, "score": 1})

    results.sort(key=lambda x: (x["score"], x.get("rating", 0)), reverse=True)
    return results


# this function gets all the valid categories to give GEMINI a list of available provider categories
async def get_all_categories() -> list[str]:
    """
    Fetches all unique categories currently in the database.
    Used to tell the AI what is available.
    """
    # mongodb 'distinct' query gets all unique values for the field 'category'
    all_providers = await Provider.find_all().to_list()
    unique_categories = {p.category for p in all_providers}
    return list(unique_categories)


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

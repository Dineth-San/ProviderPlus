"""
dashboard_service.py
─────────────────────
AI Overview service for the Provider Dashboard.
Uses the existing shared Gemini client from gemini_config.py.
Includes in-memory caching (invalidates on data change OR after TTL).
"""

from ..core.gemini_config import client, MODEL_NAME
from datetime import datetime
from typing import Dict, Tuple

# ── In-Memory Cache ────────────────────────────────────────────
# Structure: { cache_key: (overview_text, timestamp) }
_overview_cache: Dict[str, Tuple[str, datetime]] = {}

# Cache duration in seconds (10 minutes)
CACHE_TTL_SECONDS = 300


def _get_time_of_day() -> str:
    hour = datetime.now().hour
    if 5 <= hour < 12:
        return "morning"
    elif 12 <= hour < 17:
        return "afternoon"
    elif 17 <= hour < 20:
        return "evening"
    else:
        return "night"


def _build_cache_key(
        provider_id: str,
        completed_jobs_today: int,
        upcoming_jobs: int,
        rating: float,
) -> str:
    """
    Cache key includes provider ID + key stats.
    If any stat changes, it's a cache miss and triggers a fresh Gemini call.
    """
    return f"{provider_id}:{completed_jobs_today}:{upcoming_jobs}:{rating}"


def _get_cached_overview(cache_key: str) -> str | None:
    """
    Returns the cached overview if it exists and hasn't expired.
    Returns None if cache is missing or stale.
    """
    if cache_key in _overview_cache:
        cached_text, cached_time = _overview_cache[cache_key]
        elapsed = (datetime.now() - cached_time).total_seconds()
        if elapsed < CACHE_TTL_SECONDS:
            return cached_text
    return None


def _set_cached_overview(cache_key: str, overview: str) -> None:
    """Stores the overview in cache with the current timestamp."""
    _overview_cache[cache_key] = (overview, datetime.now())


def generate_provider_overview(
        provider_id: str,
        provider_name: str,
        job_role: str,
        completed_jobs_today: int = 0,
        upcoming_jobs: int = 0,
        rating: float = 0.0,
        country: str = "Sri Lanka",
) -> str:
    """
    Generates an AI-powered dashboard overview for a service provider.
    Returns cached version if data hasn't changed and TTL hasn't expired.
    Calls Gemini when stats change OR cache expires.
    """

    # Build cache key from provider ID + stats
    cache_key = _build_cache_key(provider_id, completed_jobs_today, upcoming_jobs, rating)

    # Check cache first
    cached = _get_cached_overview(cache_key)
    if cached is not None:
        print(f"[Dashboard AI]: Serving cached overview for {provider_id}")
        return cached

    # Cache miss — call Gemini
    print(f"[Dashboard AI]: Cache miss for {provider_id}, calling Gemini...")
    time_of_day = _get_time_of_day()

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=(
                f"Provider Name: {provider_name}\n"
                f"Job Role: {job_role}\n"
                f"Time of Day: {time_of_day}\n"
                f"Country: {country}\n"
                f"Completed Jobs Today: {completed_jobs_today}\n"
                f"Upcoming Jobs: {upcoming_jobs}\n"
                f"Current Rating: {rating}/5.0"
            ),
            config={
                "system_instruction": f"""
                You are a concise assistant for a provider app called Provider+.
                Give a short, structured overview for a {job_role} provider in {country}.
                
                Respond in EXACTLY this format, no more:
                
                 [Warm, personal greeting using their name and time of day - one sentence]
                - [One sentence on their current performance based on rating and jobs]
                - [One sentence on demand for {job_role} in {country} right now]
                - [One practical tip to get more bookings or improve service]
                
                Rules:
                - Each line must be ONE sentence only. No exceptions.
                - No markdown, no bullet points, no extra lines.
                - Plain text only. Warm and professional tone.
                - Total response must be under 75 words.
                """,
            }
        )

        overview_text = response.text.strip()

        # Store in cache
        _set_cached_overview(cache_key, overview_text)

        return overview_text

    except Exception as e:
        print(f"[Dashboard AI Error]: {e}")
        # Fallback message so the app never breaks
        fallback = (
            f"Welcome back, {provider_name}! You have {upcoming_jobs} upcoming "
            f"jobs scheduled. Your {rating} star rating keeps you among the top "
            f"{job_role.lower()} providers. Keep up the great work!"
        )
        # Cache the fallback too so we don't keep hammering a broken API
        _set_cached_overview(cache_key, fallback)
        return fallback
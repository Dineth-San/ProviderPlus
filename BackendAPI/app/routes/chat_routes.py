from fastapi import APIRouter
from ..models.request_models import SearchQuery
from ..agents.chat_agent import get_chat_response
from ..services.search_service import specialized_providers, get_all_categories

router = APIRouter()

@router.post("/chat")
async def chat_with_ai(query: SearchQuery):

    # this takes into consideration whether a chat history existed
    if query.context_history:
        full_prompt = f"CONTEXT: {query.context_history}\nUSER SAYS: {query.user_text}"
    else:
        full_prompt = query.user_text

    # get all available categories of providers for context for GEMINI
    try:
        all_categories = await get_all_categories()
    except Exception as e:
        print(f"Database connection failed {e}")
        all_categories = []

    # 1. Send the combined prompt to the AI agent
    ai_decision = get_chat_response(full_prompt, all_categories)

    found_providers = []

    # 2. If the AI decided we need to search, execute the search
    if ai_decision.search_filters:

        # search_filters contain all the categories and keywords that are relevant to a given context
        for search_filter in ai_decision.search_filters:
            category_results = await specialized_providers(
                category=search_filter.category,
                keywords=search_filter.keywords
            )
            """
            THE BELOW LINE WILL LIKELY CHANGE
            """
            # take the top 3 results for display
            top_results = category_results[:3]

            # append to the final results list
            found_providers.extend(top_results)



    # 3. Return EVERYTHING so the Frontend has full context
    return {
        "ai_reply": ai_decision.reply_to_user,
        # this is returned as a list since a job could have multiple categories of work
        "providers": list(found_providers),
        "needs_clarification": ai_decision.needs_clarification,
        "clarification_question": ai_decision.clarification_question,
        "search_debug": ai_decision.search_filters
    }
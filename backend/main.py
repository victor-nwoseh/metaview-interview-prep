import anthropic
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from config import ALLOWED_ORIGINS, ANTHROPIC_API_KEY
from models import PrepRequest
from prompt import SYSTEM_PROMPT, build_user_prompt

app = FastAPI(title="Interview Prep Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/generate")
async def generate(request: PrepRequest):
    if not ANTHROPIC_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="Anthropic API key is not configured on the server.",
        )

    client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)

    async def stream_brief():
        try:
            async with client.messages.stream(
                model="claude-sonnet-4-6",
                max_tokens=8192,
                system=SYSTEM_PROMPT,
                messages=[
                    {
                        "role": "user",
                        "content": build_user_prompt(
                            request.job_description, request.candidate_cv
                        ),
                    }
                ],
            ) as stream:
                async for text in stream.text_stream:
                    yield text
        except anthropic.AuthenticationError:
            yield "\n\n[Error: Invalid API key. Please check your server configuration.]\n"
        except anthropic.RateLimitError:
            yield "\n\n[Error: Rate limit reached. Please wait a moment and try again.]\n"
        except anthropic.APIStatusError as e:
            yield f"\n\n[Error: Claude API error ({e.status_code}). Please try again.]\n"
        except Exception as e:
            yield f"\n\n[Error: Unexpected error — {type(e).__name__}. Please try again.]\n"

    return StreamingResponse(stream_brief(), media_type="text/plain")

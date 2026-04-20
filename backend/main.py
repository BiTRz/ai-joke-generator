from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load variables from .env into environment variables.
load_dotenv()

# Configure Gemini client using the API key from the environment.
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
MODEL = "gemini-2.5-flash"

# Create FastAPI application instance.
app = FastAPI()

# Enable CORS for all origins/methods/headers to allow frontend to communicate with backend without issues.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body schema for /joke endpoint.
class JokeRequest(BaseModel):
    topic: str

# POST endpoint that generates a short joke about the provided topic.
@app.post("/joke")
async def joke(req: JokeRequest):
    # Build a short prompt for the Gemini model to generate a joke about the specified topic.
    prompt = f"Tell me a short, funny joke about {req.topic}."
    # Create model client and generate content from the prompt.
    model = genai.GenerativeModel(MODEL)
    res = model.generate_content(prompt)
    # Return a joke string in JSON response.
    return {"joke": res.text.strip()}
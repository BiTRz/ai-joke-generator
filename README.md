Project Description

This app is a simple AI joke generator. A user types in a topic like cats, school, or space, then the app sends that topic to the backend. The backend asks Gemini to generate a short joke and returns it to the browser. The frontend then displays the joke on the page.

Architecture Overview

The flow is:

React frontend -> FastAPI backend -> Gemini API -> FastAPI backend -> React frontend

The frontend is a Vite + React single-page app in frontend/src/App.jsx. It collects the topic, sends a POST request to /joke, and displays the returned joke.

The backend is a FastAPI app in backend/main.py. It exposes a /joke endpoint, reads GEMINI_API_KEY from the environment, calls Google’s Generative AI SDK, and returns the generated text as JSON.

The LLM provider is Gemini, currently configured to use gemini-2.5-flash.

Technical Choices

React was used for the frontend because it makes the UI simple to build and update with state.

Vite was used because it gives a fast development server and lightweight React setup.

FastAPI was used for the backend because it is easy to build a small JSON API with clear request and response models.

Pydantic is used through FastAPI for validating the incoming request body.

google-generativeai is used to connect to Gemini and generate the joke text.

python-dotenv is used so the backend can load the API key from a local .env file during development.

Setup and Running Instructions

Clone the repository and open the project folder.

Set up the backend environment.
Create and activate a Python virtual environment in backend, then install the backend dependencies:
fastapi
uvicorn
google-generativeai
python-dotenv

Add your Gemini API key.
Create a backend .env file with:
GEMINI_API_KEY=your_key_here

Start the backend server.
Run the FastAPI app from the backend folder with Uvicorn on port 8000. The project is set up to run as main:app with reload enabled during development.

Install frontend dependencies.
From the frontend folder, run npm install.

Start the frontend.
Run the Vite dev server from the frontend folder. The app will talk to the backend at http://localhost:8000/joke.

Known Limitations

The app only generates one joke at a time and only supports a single topic field.

There is no error handling in the frontend if the backend request fails.

The backend assumes the Gemini API key exists and is valid. If it is missing, the app will fail at startup.

CORS is fully open right now, which is fine for local development but not ideal for production.

The model name is hardcoded to gemini-2.5-flash, so changing models requires editing the backend code.

There is no authentication, rate limiting, caching, or production deployment setup.

AI Tools Used in Development

GitHub Copilot in VS Code was used to help explain few details when doing the project and to write explanatory project text like this.

Gemini is used by the app at runtime to generate jokes, but it is not the development assistant for the code itself.

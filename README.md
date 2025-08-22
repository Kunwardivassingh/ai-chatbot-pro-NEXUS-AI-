Nexus AI Chatbot Pro 🤖
Nexus AI is an intelligent, full-stack conversational assistant built with a powerful FastAPI backend and a sleek, responsive React frontend. Powered by Google's Gemini Pro, this application provides a seamless and interactive user experience, including secure authentication, persistent conversation history, and innovative voice-activated commands.

✨ Live Demo
[Add your live application link here when you deploy it!]

🚀 Features
Secure User Authentication: Safe and secure user registration and login system using JWT tokens.

Intelligent AI Conversations: Powered by Google's Gemini Pro for natural and helpful responses.

Persistent Conversation History: All your conversations are saved to your account, allowing you to pick up where you left off.

Voice-to-Text Input: Use your voice to talk to the assistant with a built-in speech recognition feature.

Text-to-Speech Output: The assistant's responses can be read aloud automatically for a hands-free experience.

Hands-Free Website Navigation: A unique feature that allows you to open any website in a new tab with a simple voice command (e.g., "Open YouTube").

Full Conversation Management: Create new chats, select from your history, and delete conversations you no longer need.

Customizable Settings: Adjust application settings, including theme and voice options, on a dedicated settings page.

🛠️ Tech Stack
This project is a monorepo containing a separate backend and frontend application.

Backend
Framework: FastAPI

Database: PostgreSQL (with SQLAlchemy ORM)

Database Migrations: Alembic

Authentication: JWT (JSON Web Tokens) with Passlib for hashing

AI Integration: Google Generative AI (Gemini Pro)

Validation: Pydantic

Frontend
Framework: React (with Vite)

Language: TypeScript

Routing: React Router

State Management: React Hooks (useState, useEffect)

API Communication: Axios

Styling: CSS Modules

🏁 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Python 3.10+

Node.js v18+ and npm

A running PostgreSQL database instance

⚙️ Backend Setup
Clone the repository

Bash

git clone https://github.com/your-username/ai-chatbot-pro-NEXUS-AI-.git
cd ai-chatbot-pro-NEXUS-AI-/ai-chatbot-pro/backend
Create a virtual environment and install dependencies

Bash

python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt
Create a .env file
In the backend folder, create a new file named .env and fill it with your credentials. Use the following template:

Code snippet

DATABASE_URL="postgresql://user:password@host:port/dbname"
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
SEARCH_API_KEY="YOUR_GOOGLE_SEARCH_API_KEY"
SEARCH_ENGINE_ID="YOUR_SEARCH_ENGINE_ID"
SECRET_KEY="YOUR_SECRET_KEY_FOR_JWT"
Run database migrations
This will set up all the necessary tables in your database.

Bash

alembic upgrade head
Start the server

Bash

uvicorn app.main:app --reload --port 8008
The backend API will now be running on http://127.0.0.1:8008.

🖥️ Frontend Setup
Navigate to the frontend directory

Bash

cd ../frontend 
Install NPM packages

Bash

npm install
Start the development server

Bash

npm run dev
The application will now be running and accessible at http://localhost:5173.

📂 Project Structure
The project is organized into two main directories: backend and frontend.

ai-chatbot-pro/
├── backend/
│   ├── alembic/        # Database migration scripts
│   └── app/            # Main FastAPI application source code
└── frontend/
    └── src/            # Main React application source code
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

📧 Contact
Kunwardivassingh - your-email@example.com

Project Link: https://github.com/Kunwardivassingh/ai-chatbot-pro-NEXUS-AI-

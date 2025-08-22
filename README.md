# Nexus AI Chatbot Pro 🤖

Nexus AI is an intelligent, full-stack conversational assistant built with a powerful FastAPI backend and a sleek, responsive React frontend. Powered by Google's Gemini Pro, this application provides a seamless and interactive user experience, including secure authentication, persistent conversation history, and innovative voice-activated commands.

---

## ✨ Live Demo

***[https://nexus-ai-rb11.onrender.com]***

![Nexus AI Screenshot](placeholder_for_your_screenshot_url.png)
*(You can add a screenshot of your app here)*

---

## 🚀 Features

-   **Secure User Authentication**: Safe and secure user registration and login system using JWT tokens.
-   **Intelligent AI Conversations**: Powered by Google's Gemini Pro for natural and helpful responses.
-   **Persistent Conversation History**: All your conversations are saved to your account, allowing you to pick up where you left off.
-   **Voice-to-Text Input**: Use your voice to talk to the assistant with a built-in speech recognition feature.
-   **Text-to-Speech Output**: The assistant's responses can be read aloud automatically for a hands-free experience.
-   **Hands-Free Website Navigation**: A unique feature that allows you to open any website in a new tab with a simple voice command (e.g., "Open YouTube").
-   **Full Conversation Management**: Create new chats, select from your history, and delete conversations you no longer need.
-   **Customizable Settings**: Adjust application settings, including theme and voice options, on a dedicated settings page.

---

## 🛠️ Tech Stack

This project is a monorepo containing a separate backend and frontend application.

#### **Backend**

-   **Framework**: FastAPI
-   **Database**: PostgreSQL (with SQLAlchemy ORM)
-   **Database Migrations**: Alembic
-   **Authentication**: JWT (JSON Web Tokens) with Passlib for hashing
-   **AI Integration**: Google Generative AI (Gemini Pro)
-   **Validation**: Pydantic

#### **Frontend**

-   **Framework**: React (with Vite)
-   **Language**: TypeScript
-   **Routing**: React Router
-   **State Management**: React Hooks (useState, useEffect)
-   **API Communication**: Axios
-   **Styling**: CSS Modules

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Python 3.10+
-   Node.js v18+ and npm
-   A running PostgreSQL database instance

### ⚙️ Backend Setup

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/Kunwardivassingh/ai-chatbot-pro-NEXUS-AI-.git](https://github.com/Kunwardivassingh/ai-chatbot-pro-NEXUS-AI-.git)
    cd ai-chatbot-pro-NEXUS-AI-/ai-chatbot-pro/backend
    ```

2.  **Create a virtual environment and install dependencies**
    ```sh
    python -m venv venv
    # On macOS/Linux:
    source venv/bin/activate
    # On Windows:
    venv\Scripts\activate
    pip install -r requirements.txt
    ```

3.  **Create a `.env` file**
    In the `backend` folder, create a new file named `.env` and fill it with your credentials. Use the following template:
    ```env
    DATABASE_URL="postgresql://user:password@host:port/dbname"
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    SEARCH_API_KEY="YOUR_GOOGLE_SEARCH_API_KEY"
    SEARCH_ENGINE_ID="YOUR_SEARCH_ENGINE_ID"
    SECRET_KEY="YOUR_SECRET_KEY_FOR_JWT"
    ```

4.  **Run database migrations**
    This will set up all the necessary tables in your database.
    ```sh
    alembic upgrade head
    ```

5.  **Start the server**
    ```sh
    uvicorn app.main:app --reload --port 8008
    ```
    The backend API will now be running on `http://127.0.0.1:8008`.

### 🖥️ Frontend Setup

1.  **Navigate to the frontend directory** (from the root of the project)
    ```sh
    cd ai-chatbot-pro-NEXUS-AI-/ai-chatbot-pro/frontend
    ```

2.  **Install NPM packages**
    ```sh
    npm install
    ```

3.  **Start the development server**
    ```sh
    npm run dev
    ```
    The application will now be running and accessible at `http://localhost:5173`.

---

## 📂 Project Structure

The project is organized with a main project folder containing two main directories: `backend` and `frontend`.

ai-chatbot-pro/
├── backend/
│   ├── alembic/
│   │   ├── versions/
│   │   │   ├── 0d2041ccf0a5_create_users_table.py
│   │   │   ├── 1ca7a923d3ae_create_conversation_and_message_tables.py
│   │   │   └── a861f5ed1947_add_full_name_to_users_table.py
│   │   ├── env.py
│   │   ├── README
│   │   └── script.py.mako
│   ├── app/
│   │   ├── api/
│   │   │   └── endpoints/
│   │   │       ├── auth.py
│   │   │       ├── chat.py
│   │   │       └── users.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── logging_config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── base.py
│   │   │   ├── base_class.py
│   │   │   └── session.py
│   │   ├── models/
│   │   │   ├── conversation.py
│   │   │   └── user.py
│   │   ├── schemas/
│   │   │   ├── chat.py
│   │   │   ├── conversation.py
│   │   │   └── user.py
│   │   ├── services/
│   │   │   ├── chat_service.py
│   │   │   └── user_service.py
│   │   └── main.py
│   ├── .env
│   └── alembic.ini
│
└── frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── assets/
    │   │   └── react.svg
    │   ├── components/
    │   │   ├── ChatWindow/
    │   │   ├── InputBar/
    │   │   ├── MessageBubble/
    │   │   ├── Navbar/
    │   │   └── Sidebar/
    │   ├── hooks/
    │   │   └── useTextToSpeech.ts
    │   ├── pages/
    │   │   ├── Auth.module.css
    │   │   ├── AuthLayout.tsx
    │   │   ├── ChatPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   ├── SettingsPage.module.css
    │   │   └── SettingsPage.tsx
    │   ├── services/
    │   │   ├── authService.ts
    │   │   └── chatService.ts
    │   ├── App.css
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts

---

## 📜 License

This project is licensed under the MIT License.

---

## 📧 Contact

**Kunwardivassingh** - [kunwardivasingh@gmail.com](mailto:kunwardivasingh@gmail.com)

**Project Link**: [https://github.com/Kunwardivassingh/ai-chatbot-pro-NEXUS-AI-](https://github.com/Kunwardivassingh/ai-chatbot-pro-NEXUS-AI-)

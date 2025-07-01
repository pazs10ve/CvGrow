# CvGrow: The AI-Powered Resume Builder

CvGrow is a modern, web-based application designed to streamline the resume creation process. It leverages the power of Google's Gemini AI to help users craft professional, compelling content for their resumes. With a polished and intuitive user interface built with React and Mantine, users can quickly input their details and generate beautiful resumes in PDF, DOCX, and LaTeX formats.

<!-- Placeholder: Replace with an actual screenshot URL -->

## Key Features

- **AI-Powered Content Generation**: Automatically generates professional summaries and descriptions based on user input.
- **Multi-Step Form**: An intuitive, animated form guides users through sections for personal info, education, experience, projects, and skills.
- **Multiple Export Formats**: Download your finished resume as a high-quality PDF, an editable DOCX file, or a professional LaTeX document.
- **Live Preview**: See how your resume looks in real-time as you fill out the form.
- **Polished UI/UX**: A beautiful, modern interface with smooth animations and a premium feel.
- **Containerized Backend**: The FastAPI backend is fully containerized with Docker for easy, reliable deployment.

## Tech Stack

**Frontend:**
- **Framework**: React (with Vite)
- **Language**: TypeScript
- **UI Library**: Mantine
- **Styling**: CSS Modules

**Backend:**
- **Framework**: FastAPI
- **Language**: Python
- **AI Integration**: Google Gemini API
- **Document Generation**: `python-docx`, `PyLaTeX`
- **Deployment**: Docker, Gunicorn

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.9+
- Docker
- A Google Gemini API Key

### Backend Setup

1.  **Navigate to the root directory.**
2.  **Create a `.env` file** and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run the development server:**
    ```bash
    uvicorn app.app:app --reload
    ```
    The backend will be available at `http://localhost:8000`.

### Frontend Setup

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

## Docker Deployment (Backend)

The backend is configured for a production-ready Docker deployment.

1.  **Build the Docker image:**
    ```bash
    docker build -t cvgrow-backend .
    ```
2.  **Run the container:**
    ```bash
    docker run -d -p 8000:8000 --env-file .env --name cvgrow cvgrow-backend
    ``` 

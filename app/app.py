import logging
import tempfile
import base64
import subprocess
from fastapi import FastAPI, HTTPException
import os
from fastapi.middleware.cors import CORSMiddleware
from .models import ResumeData
from .services import (
    generate_resume_content, 
    create_latex_file, 
    convert_tex_to_pdf, 
    convert_tex_to_docx
)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()

# CORS Middleware
origins = [
    "http://localhost:5173", # Local dev server for frontend
]

# Add the production frontend URL from an environment variable for security
FRONTEND_URL = os.getenv("FRONTEND_URL")
if FRONTEND_URL:
    origins.append(FRONTEND_URL)

print(f"--- DEBUG: Allowed CORS origins: {origins} ---")
logging.warning(f"Allowed CORS origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.title = "CvGrow AI Resume Builder"

@app.get("/")
def read_root():
    return {"message": "CvGrow API is running."}

@app.post("/generate-resume/")
def generate_resume(data: ResumeData):
    logging.info(f"Received request to generate resume for: {data.full_name}")

    # Create a temporary directory that will be automatically cleaned up
    with tempfile.TemporaryDirectory() as temp_dir:
        try:
            # Step 1: Generate LaTeX content
            logging.info("Generating LaTeX content from AI...")
            resume_latex_content = generate_resume_content(data)
            if not resume_latex_content or resume_latex_content.isspace():
                logging.error("AI returned empty or whitespace content.")
                raise HTTPException(status_code=500, detail="AI failed to generate content.")

            # Step 2: Create the .tex file in the temporary directory
            logging.info(f"Creating .tex file in temp dir: {temp_dir}")
            tex_path = create_latex_file(data.full_name, resume_latex_content, temp_dir)

            # Step 3: Convert to PDF and DOCX in the same temporary directory
            logging.info(f"Converting {tex_path} to PDF and DOCX...")
            pdf_path = convert_tex_to_pdf(tex_path)
            docx_path = convert_tex_to_docx(tex_path)
            logging.info("Conversions successful.")

            # Step 4: Read the binary content of the generated files
            logging.info("Reading and encoding generated files...")
            with open(pdf_path, "rb") as f:
                pdf_b64 = base64.b64encode(f.read()).decode("utf-8")
            with open(docx_path, "rb") as f:
                docx_b64 = base64.b64encode(f.read()).decode("utf-8")
            with open(tex_path, "rb") as f:
                tex_b64 = base64.b64encode(f.read()).decode("utf-8")

            # Step 5: Return the Base64-encoded files in the response
            return {
                "message": "Resume generated successfully.",
                "files": {
                    "pdf": pdf_b64,
                    "docx": docx_b64,
                    "tex": tex_b64,
                }
            }
        except (FileNotFoundError, RuntimeError, subprocess.CalledProcessError) as e:
            logging.error(f"A file operation or conversion error occurred: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail=str(e))
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail="An unexpected error occurred.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
import logging
from fastapi import FastAPI, HTTPException
from models import ResumeData
from services import generate_resume_content, create_latex_file

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI(title="CvGrow AI Resume Builder")


@app.get("/")
def read_root():
    return {"message": "CvGrow API is running."}

@app.post("/generate-resume/")
def generate_resume(data: ResumeData):
    logging.info(f"Received request to generate resume for: {data.full_name}")
    try:
        logging.info("Generating LaTeX content from AI...")
        resume_latex_body = generate_resume_content(data)
        logging.info(f"Successfully generated LaTeX content. Length: {len(resume_latex_body)} chars.")

        if not resume_latex_body or resume_latex_body.isspace():
            logging.error("AI returned empty or whitespace content.")
            raise HTTPException(status_code=500, detail="AI failed to generate content.")

        logging.info(f"Creating .tex file for {data.full_name}...")
        file_path = create_latex_file(data.full_name, resume_latex_body)
        logging.info(f"Successfully created file at: {file_path}")
        
        return {"message": "Resume .tex file created successfully", "path": file_path}
    except FileNotFoundError as e:
        logging.error(f"File not found error: {e}", exc_info=True)
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
import logging
from fastapi import FastAPI, HTTPException
from models import ResumeData
from services import (
    generate_resume_content, 
    create_latex_file, 
    convert_tex_to_pdf, 
    convert_tex_to_docx
)

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
        # Step 1: Generate .tex content
        logging.info("Generating LaTeX content from AI...")
        resume_latex_content = generate_resume_content(data)
        logging.info(f"Successfully generated LaTeX content. Length: {len(resume_latex_content)} chars.")

        if not resume_latex_content or resume_latex_content.isspace():
            logging.error("AI returned empty or whitespace content.")
            raise HTTPException(status_code=500, detail="AI failed to generate content.")

        # Step 2: Create the .tex file
        logging.info(f"Creating .tex file for {data.full_name}...")
        tex_path = create_latex_file(data.full_name, resume_latex_content)
        logging.info(f"Successfully created .tex file at: {tex_path}")

        # Step 3: Convert .tex to .pdf
        logging.info(f"Converting {tex_path} to PDF...")
        pdf_path = convert_tex_to_pdf(tex_path)
        logging.info(f"Successfully created PDF at: {pdf_path}")

        # Step 4: Convert .tex to .docx
        logging.info(f"Converting {tex_path} to DOCX...")
        docx_path = convert_tex_to_docx(tex_path)
        logging.info(f"Successfully created DOCX at: {docx_path}")
        
        return {
            "message": "Resume created successfully in all formats.",
            "paths": {
                "tex": tex_path,
                "pdf": pdf_path,
                "docx": docx_path
            }
        }
    except FileNotFoundError as e:
        logging.error(f"File not found error: {e}", exc_info=True)
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
from google import genai
from dotenv import load_dotenv
import os
from models import ResumeData
from prompts import create_resume_prompt

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")
client = genai.Client(api_key=api_key)

def generate_resume_content(data: ResumeData) -> str:
    """Generates a complete, edited LaTeX resume by having the AI edit the template."""
    try:
        with open('resume_format.tex', 'r', encoding='utf-8') as f:
            latex_template = f.read()
    except FileNotFoundError:
        raise FileNotFoundError("The 'resume_format.tex' template file was not found. Make sure it's in the root directory.")

    prompt = create_resume_prompt(data, latex_template)
    
    response = client.models.generate_content(
        model="gemini-1.5-flash", 
        contents=prompt
    )
    
    edited_latex = response.text.strip()
    if edited_latex.startswith("```latex"):
        edited_latex = edited_latex[7:].strip()
    if edited_latex.startswith("```"):
        edited_latex = edited_latex[3:].strip()
    if edited_latex.endswith("```"):
        edited_latex = edited_latex[:-3].strip()
        
    return edited_latex

def create_latex_file(name: str, full_latex_content: str) -> str:
    """Saves the complete LaTeX content received from the AI to a .tex file."""
    safe_name = "".join(x for x in name.lower() if x.isalnum())
    output_dir = "generated_resumes"
    os.makedirs(output_dir, exist_ok=True)
    
    file_path = os.path.join(output_dir, f"resume_{safe_name}.tex")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(full_latex_content)
        
    return file_path


if __name__ == '__main__':

    print("--- Running Services Test ---")
    
    # Check for prerequisites
    if not os.path.exists('resume_format.tex'):
        print("SKIPPING TEST: 'resume_format.tex' not found.")
    elif not os.getenv("GEMINI_API_KEY"):
        print("SKIPPING TEST: 'GEMINI_API_KEY' not found in .env file.")
    else:
        sample_data = ResumeData(
            full_name="Service Test User",
            email="test@example.com",
            phone_number="555-555-5555",
            address="Test City, TS",
            job_title="Test Engineer",
            passion_statement="I am passionate about testing.",
            university_name="Testing University",
            degree="B.S. in Testing",
            graduation_date="Dec 2024",
            experience_description="Tested things.",
            experience_responsibilities="Made sure things worked.",
            project_description="Built a test project.",
            technical_skills=["Pytest", "unittest"],
            soft_skills=["Attention to Detail"]
        )

        print("1. Generating LaTeX body...")
        body = generate_resume_content(sample_data)
        print("...Done.")
        
        print("2. Creating .tex file...")
        path = create_latex_file("Service Test User", body)
        print(f"...Done. File created at: {path}")
        print("--- Test Complete ---")

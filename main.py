from app.models import ResumeData
from app.services import generate_resume_content, create_latex_file
import os

def run_test_workflow():
    """A test function to run the full resume generation workflow."""
    print("--- Starting Resume Generation Test Workflow ---")

    # Check for prerequisites
    if not os.path.exists('resume_format.tex'):
        print("ERROR: 'resume_format.tex' not found. Please create it in the root directory.")
        return
    if not os.getenv("GEMINI_API_KEY"):
        print("ERROR: 'GEMINI_API_KEY' not found in your .env file.")
        return

    # 1. Create sample data that a user might provide
    print("Step 1: Creating sample user data...")
    sample_data = ResumeData(
        full_name="Jane Doe",
        email="jane.doe@example.com",
        phone_number="123-456-7890",
        address="San Francisco, CA",
        linkedin_url="https://linkedin.com/in/janedoe-example",
        github_url="https://github.com/janedoe-example",
        job_title="Junior Data Scientist",
        passion_statement="I am passionate about uncovering stories and insights from complex datasets to drive business decisions.",
        university_name="Bay Area University",
        degree="Bachelor of Science in Statistics",
        graduation_date="May 2024",
        experience_description="Data Science Intern at Innovate Corp (Summer 2023)",
        experience_responsibilities="Collaborated on a project to analyze customer churn, which involved cleaning data with Pandas and building a predictive model with Scikit-learn.",
        project_description="Developed a machine learning model to predict housing prices in California, achieving 85% accuracy on a test dataset.",
        technical_skills=["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "Tableau"],
        soft_skills=["Data Analysis", "Machine Learning", "Problem Solving", "Communication"]
    )
    print("...Sample data created.")

    try:
        # 2. Generate the LaTeX body content via the AI
        print("\nStep 2: Calling Gemini AI to generate LaTeX resume body...")
        latex_body = generate_resume_content(sample_data)
        print("...AI content generated successfully.")

        # 3. Create the final .tex file using the template
        print("\nStep 3: Creating final .tex file from template and AI content...")
        file_path = create_latex_file(sample_data.full_name, latex_body)
        print(f"...Success! File created at: {file_path}")

        # 4. Print a snippet of the final file for verification
        with open(file_path, 'r', encoding='utf-8') as f:
            print("\n--- Snippet of Generated File ---")
            for i, line in enumerate(f):
                if i >= 20: # Print first 20 lines
                    break
                print(line, end='')
            print("...")
            print("---------------------------------")

    except Exception as e:
        print(f"\n--- An Error Occurred During the Workflow ---")
        print(e)

if __name__ == "__main__":
    run_test_workflow()

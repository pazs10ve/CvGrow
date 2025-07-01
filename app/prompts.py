from models import ResumeData

def create_resume_prompt(data: ResumeData, latex_template: str) -> str:
    """Creates a prompt for the AI to edit a full LaTeX template with new data."""
    
    prompt = f"""
    You are an expert LaTeX resume editor. Your task is to take the provided LaTeX template and fill it with the new candidate's information.
    The final output must be the **complete, modified LaTeX file**, ready to be compiled. Do not add any extra explanations or markdown formatting.

    **New Candidate's Information:**
    - Name: {data.full_name}
    - Email: {data.email}
    - Phone: {data.phone_number}
    - LinkedIn: {data.linkedin_url or 'N/A'}
    - GitHub: {data.github_url or 'N/A'}
    - Target Job: {data.job_title}
    - Summary/Objective: Based on this passion statement: '{data.passion_statement}'
    - University: {data.university_name}
    - Degree: {data.degree}
    - Graduation Date: {data.graduation_date}
    - Experience: {data.experience_description} where responsibilities included: {data.experience_responsibilities}
    - Projects: {data.project_description}
    - Skills: {', '.join(data.technical_skills + data.soft_skills)}

    **Here is the LaTeX template you must edit. Replace the placeholder information (like 'Jake Ryan', 'Southwestern University', project descriptions, etc.) with the new candidate's information provided above.**

    ```latex
    {latex_template}
    ```

    Return only the raw, fully edited LaTeX code.
    """
    return prompt


if __name__ == '__main__':
    sample_data = ResumeData(
        full_name="Jane Doe",
        email="jane.doe@example.com",
        phone_number="123-456-7890",
        address="City, State",
        job_title="Software Engineer",
        passion_statement="I love building things.",
        university_name="Tech University",
        degree="B.S. in Computer Science",
        graduation_date="May 2024",
        experience_description="Did stuff at a company.",
        experience_responsibilities="Wrote code and fixed bugs.",
        project_description="Built a cool app.",
        technical_skills=["Python", "Git"],
        soft_skills=["Teamwork"]
    )
    
    sample_template = r"\documentclass{article}"

    generated_prompt = create_resume_prompt(sample_data, sample_template)
    print("--- Generated Prompt Example ---")
    print(generated_prompt)
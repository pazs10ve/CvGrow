from pydantic import BaseModel, EmailStr, ValidationError
from typing import Optional, List


class ResumeData(BaseModel):
    full_name: str
    email: EmailStr
    phone_number: str
    address: str
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None
    blog_url: Optional[str] = None
    job_title: str
    passion_statement: str
    university_name: str
    degree: str
    graduation_date: str
    experience_description: str
    experience_responsibilities: str
    project_description: str
    technical_skills: List[str]
    soft_skills: List[str]


if __name__ == '__main__':
    # This is an example of how to use and validate the ResumeData model.
    sample_data = {
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "phone_number": "123-456-7890",
        "address": "New York, NY",
        "job_title": "Software Developer",
        "passion_statement": "Building efficient and scalable software.",
        "university_name": "State University",
        "degree": "B.S. in Computer Science",
        "graduation_date": "May 2024",
        "experience_description": "Intern at a company.",
        "experience_responsibilities": "Wrote code.",
        "project_description": "Built an app.",
        "technical_skills": ["Python", "FastAPI"],
        "soft_skills": ["Teamwork"]
        # Note: Optional fields like 'linkedin_url' are not included
    }

    print("--- Testing Model Validation ---")
    try:
        # Pydantic automatically validates the data upon instantiation
        resume_instance = ResumeData(**sample_data)
        print("Validation Successful!")
        print("Full Name:", resume_instance.full_name)
        print("Email:", resume_instance.email)
    except ValidationError as e:
        print("Validation Failed!")
        print(e)

    print("\n--- Testing with invalid email ---")
    invalid_data = sample_data.copy()
    invalid_data['email'] = 'not-an-email'
    try:
        ResumeData(**invalid_data)
    except ValidationError as e:
        print("Validation failed as expected.")
        print(e)

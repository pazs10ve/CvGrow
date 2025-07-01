export interface EducationEntry {
  university_name: string;
  degree: string;
  graduation_date: string;
}

export interface ExperienceEntry {
  company_name: string;
  job_title: string;
  experience_description: string;
  experience_responsibilities: string;
}

export interface ProjectEntry {
  project_name: string;
  project_description: string;
}

export interface ResumeFormData {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  linkedin_url: string;
  github_url: string;
  job_title: string;
  passion_statement: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  technical_skills: string[];
  soft_skills: string[];
}

export interface GeneratedFiles {
  pdf: string; // Base64 encoded
  docx: string; // Base64 encoded
  tex: string; // Base64 encoded
}

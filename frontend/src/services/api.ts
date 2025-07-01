import axios from 'axios';
import type { ResumeFormData, GeneratedFiles } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_URL,
});

export const generateResume = async (formData: ResumeFormData): Promise<GeneratedFiles> => {
  try {
    const response = await apiClient.post('/generate-resume/', formData);
    if (response.data && response.data.files) {
      return response.data.files;
    }
    throw new Error('Invalid response structure from the server.');
  } catch (error) {
    console.error('Error generating resume:', error);
    throw new Error('Failed to generate resume. Please check the console for details.');
  }
};

/**
 * Decodes a Base64 string and triggers a file download.
 * @param base64Data The Base64 encoded file content.
 * @param fileName The name for the downloaded file (e.g., 'resume.pdf').
 * @param mimeType The MIME type of the file (e.g., 'application/pdf').
 */
export const downloadFile = (base64Data: string, fileName: string, mimeType: string) => {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

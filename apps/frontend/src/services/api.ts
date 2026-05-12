// Determine API URL based on environment
// For production (Vercel), use the Render backend URL
// For development, use localhost
const getApiUrl = () => {
  // Check if VITE_API_URL is set (from .env files or Vercel env vars)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For production builds without env var, use Render backend
  if (import.meta.env.PROD) {
    return 'https://docflow-hwdr.onrender.com/api';
  }
  
  // For development, use localhost
  return 'http://localhost:8000/api';
};

const API_URL = getApiUrl();

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const api = {
  async post(path: string, data: any) {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async get(path: string) {
    const response = await fetch(`${API_URL}${path}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async put(path: string, data: any) {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async delete(path: string) {
    const response = await fetch(`${API_URL}${path}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async upload(path: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  }
};

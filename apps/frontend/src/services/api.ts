// Determine API URL based on the current hostname (runtime check)
const getApiUrl = () => {
  // Check if an environment variable is provided (Vite standard)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Fallback for Vercel production
  if (typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('doc-flow'))) {
    return 'https://docflow-kwdr.onrender.com/api';
  }
  
  // Local development
  return 'http://localhost:8000/api';
};

export const API_URL = getApiUrl();

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

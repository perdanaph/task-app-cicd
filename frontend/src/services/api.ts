const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
import type { Task } from '../types';

const getHeaders = (withAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (withAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

const handleResponse = async <T>(res: Response): Promise<T> => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data as T;
};

// Auth
export const authService = {
  register: async (username: string, email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, email, password }),
    });
    return handleResponse<{ id: string; username: string; email: string }>(res);
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<{ token: string; user: { id: string; username: string } }>(res);
  },
};

// Tasks
export const taskService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      headers: getHeaders(true),
    });
    return handleResponse<Task[]>(res);
  },

  create: async (title: string, description: string, priority: string) => {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ title, description, priority }),
    });
    return handleResponse<Task>(res);
  },

  update: async (id: string, updates: Partial<Task>) => {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify(updates),
    });
    return handleResponse<Task>(res);
  },

  delete: async (id: string) => {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleResponse<{ message: string }>(res);
  },
};
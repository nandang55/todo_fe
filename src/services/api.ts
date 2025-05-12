import axios from 'axios';
import { Todo, User } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const todoService = {
  async getAll() {
    const response = await api.get('/todos');
    return response.data;
  },

  async create(data: { title: string; description?: string }) {
    const response = await api.post('/todos', data);
    return response.data;
  },

  async update(id: string, data: { title?: string; description?: string; completed?: boolean }) {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/todos/${id}`);
  },
}; 
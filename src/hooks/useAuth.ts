import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/api';
import { RegisterCredentials, User } from '../types';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getProfile()
        .then(user => {
          setUser(user);
        })
        .catch(() => {
          localStorage.removeItem('token');
          router.push('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { token, user } = await authService.login(email, password);
      localStorage.setItem('token', token);
      setUser(user);
      router.push('/todos');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Email atau password salah');
      } else {
        setError('Terjadi kesalahan saat login');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const { token, user } = await authService.register(data);
      localStorage.setItem('token', token);
      setUser(user);
      router.push('/todos');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Email sudah terdaftar');
      } else {
        setError('Terjadi kesalahan saat registrasi');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return false;
    }
    return true;
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
  };
}; 
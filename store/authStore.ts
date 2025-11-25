import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        try {
          const response = await axios.post(`${API_URL}/api/auth/login`, {
            email,
            password,
          })
          
          const { token, user } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
          })
          
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } catch (error) {
          throw error
        }
      },
      
      register: async (name, email, password) => {
        try {
          const response = await axios.post(`${API_URL}/api/auth/register`, {
            name,
            email,
            password,
          })
          
          const { token, user } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
          })
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } catch (error) {
          throw error
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        
        delete axios.defaults.headers.common['Authorization']
      },
      
      checkAuth: async () => {
        const token = get().token
        
        if (!token) {
          get().logout()
          return
        }
        
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await axios.get(`${API_URL}/api/auth/me`)
          
          set({
            user: response.data,
            isAuthenticated: true,
          })
        } catch (error) {
          get().logout()
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

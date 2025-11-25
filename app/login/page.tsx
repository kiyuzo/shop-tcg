'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const { login, register } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        toast.success('Welcome back!')
        router.push('/account')
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          setLoading(false)
          return
        }
        await register(formData.name, formData.email, formData.password)
        toast.success('Account created successfully!')
        router.push('/account')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-wabi-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <Image 
                src="/fox-logo.png" 
                alt="kon logo" 
                width={64} 
                height={64}
                className="object-contain"
              />
            </div>
          </Link>
          <h1 className="text-4xl font-display font-bold text-sumi-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sumi-600">
            {isLogin
              ? 'Sign in to access your account'
              : 'Join our community of collectors'}
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-sumi-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="input-base"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sumi-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-base"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-sumi-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input-base"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-sumi-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  minLength={6}
                  className="input-base"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Processing...'
                : isLogin
                ? 'Sign In'
                : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-sakura-600 hover:text-sakura-700 font-medium"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-sumi-600 hover:text-sumi-900">
                Forgot password?
              </Link>
            </div>
          )}
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-sumi-600 hover:text-sumi-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

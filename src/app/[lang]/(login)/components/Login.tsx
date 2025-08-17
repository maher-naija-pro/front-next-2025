'use client'

import { motion } from 'framer-motion'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '@/app/[lang]/(login)/services/auth'
import type { LoginProps } from '@/lib/model'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/lib/loginSchema'

export default function Login({ dict, lang }: LoginProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  type LoginFormInputs = z.infer<typeof loginSchema>

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful:', data.access_token)
      router.push(`/${lang}/dashboard`) // redirection avec langue dans l'url
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError(dict.errors.unexpected || 'An unexpected error occurred.')
      }
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <Avatar className="w-14 h-14 mx-auto rounded-full border border-gray-200 shadow-sm">
              <AvatarImage src="/assets/logo/amperon.png" alt="@selma" />
              <AvatarFallback>
                <User className="h-8 w-8 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold tracking-tighter">
              {dict.login.title || 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground">
              {dict.login.subtitle ||
                'Enter your credentials to access your account'}
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit((data) => mutation.mutate(data))}
          >
            <div className="space-y-2">
              <Label htmlFor="email">{dict.login.emailLabel || 'Email'}</Label>
              <Input
                id="email"
                type="email"
                data-testid="login-email"
                placeholder={dict.login.emailPlaceholder || 'test@test.com'}
                {...register('email')}
              />
              {errors.email && (
                <p data-testid="error-email" className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">
                {dict.login.passwordLabel || 'Password'}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  data-testid="login-password"
                  placeholder={dict.login.passwordPlaceholder || '********'}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  data-testid="error-password"
                  className="text-red-500 text-sm"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" data-testid="remember-me" />
                <Label htmlFor="remember">
                  {dict.login.rememberMe || 'Remember Me'}
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-primary-500 hover:text-primary-600"
              >
                {dict.login.forgotPassword || 'Forget Password?'}
              </a>
            </div>

            {mutation.isError && (
              <p className="text-red-500 text-sm" data-testid="login-error">
                {(mutation.error as Error).message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              data-testid="login-submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending
                ? dict.login.loggingIn || 'Logging in ...'
                : dict.login.signIn || 'Sign In'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

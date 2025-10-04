'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setError('كلمات المرور غير متطابقة');
          setIsLoading(false);
          return;
        }

        const success = await register(formData.name, formData.email, formData.password);
        if (success) {
          router.push('/');
        } else {
          setError('خطأ في التسجيل');
        }
      } else {
        const success = await login(formData.email, formData.password);
        if (success) {
          router.push('/');
        } else {
          setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        {/* Glass morphism card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto h-12 w-12 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-full flex items-center justify-center"
            >
              <User className="h-6 w-6 text-white" />
            </motion.div>
            <h2 className="mt-6 text-3xl font-bold text-white">
              {mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              {mode === 'signin' 
                ? 'أدخل بياناتك للوصول إلى مهامك' 
                : 'أنشئ حساباً جديداً لإدارة مهامك'
              }
            </p>
          </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="sr-only">
                  الاسم
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={mode === 'signup'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 text-right border border-gray-600/50 bg-black/30 backdrop-blur-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-black/50 transition-all duration-200"
                    placeholder="الاسم الكامل"
                    dir="rtl"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 text-right border border-gray-600/50 bg-black/30 backdrop-blur-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-black/50 transition-all duration-200"
                  placeholder="البريد الإلكتروني"
                  dir="rtl"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 pl-10 text-right border border-gray-600/50 bg-black/30 backdrop-blur-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-black/50 transition-all duration-200"
                  placeholder="كلمة المرور"
                  dir="rtl"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required={mode === 'signup'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 pl-10 text-right border border-gray-600/50 bg-black/30 backdrop-blur-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-black/50 transition-all duration-200"
                    placeholder="تأكيد كلمة المرور"
                    dir="rtl"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                جاري المعالجة...
              </div>
            ) : (
              mode === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب'
            )}
          </motion.button>

          <div className="text-center">
            <p className="text-sm text-gray-300">
              {mode === 'signin' ? (
                <>
                  ليس لديك حساب؟{' '}
                  <a
                    href="/auth/signup"
                    className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    إنشاء حساب جديد
                  </a>
                </>
              ) : (
                <>
                  لديك حساب بالفعل؟{' '}
                  <a
                    href="/auth/signin"
                    className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    تسجيل الدخول
                  </a>
                </>
              )}
            </p>
          </div>
        </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
}

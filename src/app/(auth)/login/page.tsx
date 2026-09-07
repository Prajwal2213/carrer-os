'use client';

import { useState, type FormEvent } from 'react';
import { Zap, Eye, EyeOff, Check } from 'lucide-react';
import { login } from '@/src/actions/auth';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f5f4] text-slate-900 flex items-center justify-center p-4 font-sans selection:bg-slate-900 selection:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.05),transparent_55%)]" />

      <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-[0_20px_45px_rgba(15,23,42,0.06)] relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1.5">
            Sign In
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            Access your account
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 bg-slate-100 border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Welcome Back!</h3>
            <p className="text-xs text-slate-500">Authenticating credentials...</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs text-slate-700 hover:text-slate-900 underline underline-offset-4"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <div
                className={`rounded-xl border transition-all duration-200 ${focusedField === 'email'
                    ? 'border-slate-900 shadow-[0_0_0_3px_rgba(15,23,42,0.06)]'
                    : 'border-slate-200 hover:border-slate-300'
                  }`}
              >
                <div className="bg-white rounded-xl px-4 py-3 min-h-[58px] flex flex-col justify-center">
                  <label
                    htmlFor="email"
                    className={`text-[11px] font-medium tracking-wide transition-colors ${focusedField === 'email' ? 'text-slate-900' : 'text-slate-500'
                      }`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent text-slate-900 text-sm font-normal focus:outline-none placeholder-slate-400"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div
                className={`rounded-xl border transition-all duration-200 ${focusedField === 'password'
                    ? 'border-slate-900 shadow-[0_0_0_3px_rgba(15,23,42,0.06)]'
                    : 'border-slate-200 hover:border-slate-300'
                  }`}
              >
                <div className="bg-white rounded-xl px-4 py-3 min-h-[58px] flex items-center justify-between">
                  <div className="flex-1 pr-2">
                    {password && (
                      <label
                        htmlFor="password"
                        className={`block text-[11px] font-medium transition-colors ${focusedField === 'password' ? 'text-slate-900' : 'text-slate-500'
                          }`}
                      >
                        Password
                      </label>
                    )}
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder={password ? '' : 'Password'}
                      className="w-full bg-transparent text-slate-900 text-sm font-normal focus:outline-none placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-500 hover:text-slate-800 focus:outline-none p-1 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2.5 cursor-pointer select-none group">
                <div
                  onClick={() => setKeepSignedIn(!keepSignedIn)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${keepSignedIn
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                    }`}
                >
                  {keepSignedIn && <Check className="w-3 h-3 stroke-3" />}
                </div>
                <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors">
                  Keep me signed in
                </span>
              </label>

              <a
                href="#forgot"
                className="text-xs text-slate-500 hover:text-slate-800 transition-colors font-normal"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 mt-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-medium text-xs tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'SIGN IN'
              )}
            </button>

            <div className="relative my-6 py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] tracking-widest font-semibold uppercase">
                <span className="bg-white px-3 text-slate-400">OR</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-medium text-slate-700 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center text-xs text-slate-500">
          New here?{' '}
          <a href="/signup" className="text-slate-900 font-medium hover:underline inline-flex items-center gap-0.5">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useActionState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import { login } from '@/src/actions/auth';

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>('email');

  // useActionState handles state, errors, and pending state automatically
  const [state, formAction, isPending] = useActionState(login, null);

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

        {/* Display Supabase auth error if password or email is incorrect */}
        {state?.error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <div className="relative group">
            <div
              className={`rounded-xl border transition-all duration-200 ${
                focusedField === 'email'
                  ? 'border-slate-900 shadow-[0_0_0_3px_rgba(15,23,42,0.06)]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="bg-white rounded-xl px-4 py-3 min-h-[58px] flex flex-col justify-center">
                <label
                  htmlFor="email"
                  className={`text-[11px] font-medium tracking-wide transition-colors ${
                    focusedField === 'email' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
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
              className={`rounded-xl border transition-all duration-200 ${
                focusedField === 'password'
                  ? 'border-slate-900 shadow-[0_0_0_3px_rgba(15,23,42,0.06)]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="bg-white rounded-xl px-4 py-3 min-h-[58px] flex items-center justify-between">
                <div className="flex-1 pr-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Password"
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
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  keepSignedIn
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
            disabled={isPending}
            className="w-full py-3.5 px-4 mt-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-medium text-xs tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-70"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'SIGN IN'
            )}
          </button>
        </form>

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
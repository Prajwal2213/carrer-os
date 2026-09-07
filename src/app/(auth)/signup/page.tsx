'use client';

import { useState, type FormEvent } from 'react';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { signup } from '@/src/actions/auth';

export default function App() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Password visibility controls
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Active/focused field tracking to mirror exact highlight state in reference
    const [focusedField, setFocusedField] = useState<'fullName' | 'email' | 'password' | 'confirmPassword' | null>('fullName');

    // Form submission & state management
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    // 1. Client-side validation check
    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    setIsLoading(true);

    try {
        const formData = new FormData(event.currentTarget);

        // 2. Map "fullName" input key to "name" expected by the signup action
        formData.set('name', fullName);

        const result = await signup(formData);

        if (result.success) {
            setIsSubmitted(true);
        } else {
            setError(result.error ?? 'Unable to create your account. Please try again.');
        }
    } catch (err) {
        setError('An unexpected error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#f3f4f8] p-4 text-slate-900 sm:p-6">
            {/* Background Soft Glow / Radial Depth mirroring reference image */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(243,244,248,1)_100%)]" />
            <div className="pointer-events-none absolute h-150 w-150 rounded-full bg-white opacity-80 blur-3xl" />

            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <div className="w-full max-w-110 rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-10">

                    {/* Header Title & Subtitle */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#0f172a] mb-1.5">
                            Sign Up
                        </h1>
                        <p className="text-sm text-slate-400 font-normal">
                            Create your account
                        </p>
                    </div>

                    { }
                    {isSubmitted ? (
                        <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                            <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-slate-900/20">
                                <Check className="w-7 h-7 stroke-[2.5]" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Account Created!</h3>
                            <p className="mx-auto max-w-65 text-xs leading-relaxed text-slate-500">
                                We've sent a verification link to <span className="font-semibold text-slate-800">{email}</span>.
                            </p>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFullName('');
                                    setEmail('');
                                    setPassword('');
                                    setConfirmPassword('');
                                }}
                                className="mt-4 text-xs font-semibold text-slate-900 hover:underline inline-flex items-center gap-1"
                            >
                                Sign up with another email
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Error Notification Badge */}
                            {error && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200/60 text-red-600 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* 1. Full Name Input Field */}
                            <div className="relative">
                                <div
                                    className={`rounded-2xl transition-all duration-200 ${focusedField === 'fullName'
                                        ? 'ring-2 ring-slate-900 border-transparent shadow-sm'
                                        : 'border border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                >
                                    <div className="flex min-h-14.5 flex-col justify-center px-4 py-3">
                                        <label
                                            htmlFor="fullName"
                                            className={`text-[11px] font-medium tracking-wide transition-colors ${focusedField === 'fullName' || fullName ? 'text-slate-900 font-semibold' : 'text-slate-400'
                                                }`}
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            onFocus={() => setFocusedField('fullName')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className="w-full bg-transparent text-slate-900 text-sm font-medium focus:outline-none placeholder-slate-400"
                                            placeholder={focusedField === 'fullName' ? 'John Doe' : ''}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Email Input Field (Styled actively like the snapshot) */}
                            <div className="relative">
                                <div
                                    className={`rounded-2xl transition-all duration-200 ${focusedField === 'email'
                                        ? 'ring-2 ring-slate-900 border-transparent shadow-sm'
                                        : 'border border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                >
                                    <div className="flex min-h-14.5 flex-col justify-center px-4 py-3">
                                        <label
                                            htmlFor="email"
                                            className={`text-[11px] font-semibold tracking-wide transition-colors ${focusedField === 'email' || email ? 'text-slate-900' : 'text-slate-400'
                                                }`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className="w-full bg-transparent text-slate-900 text-sm font-medium focus:outline-none placeholder-slate-400"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 3. Password Field with Eye Toggle */}
                            <div className="relative">
                                <div
                                    className={`rounded-2xl transition-all duration-200 ${focusedField === 'password'
                                        ? 'ring-2 ring-slate-900 border-transparent shadow-sm'
                                        : 'border border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                >
                                    <div className="flex min-h-14.5 items-center justify-between px-4 py-3">
                                        <div className="flex flex-1 flex-col justify-center pr-2">
                                            {(focusedField === 'password' || password) && (
                                                <label
                                                    htmlFor="password"
                                                    className="block text-[11px] font-semibold text-slate-900 transition-colors"
                                                >
                                                    Password
                                                </label>
                                            )}
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onFocus={() => setFocusedField('password')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                placeholder={focusedField === 'password' || password ? '' : 'Password'}
                                                className="w-full bg-transparent text-slate-900 text-sm font-medium focus:outline-none placeholder-slate-400"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-slate-400 hover:text-slate-700 focus:outline-none p-1 transition-colors"
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Confirm Password Field with Eye Toggle */}
                            <div className="relative">
                                <div
                                    className={`rounded-2xl transition-all duration-200 ${focusedField === 'confirmPassword'
                                        ? 'ring-2 ring-slate-900 border-transparent shadow-sm'
                                        : 'border border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                >
                                    <div className="flex min-h-14.5 items-center justify-between px-4 py-3">
                                        <div className="flex flex-1 flex-col justify-center pr-2">
                                            {(focusedField === 'confirmPassword' || confirmPassword) && (
                                                <label
                                                    htmlFor="confirmPassword"
                                                    className="block text-[11px] font-semibold text-slate-900 transition-colors"
                                                >
                                                    Confirm Password
                                                </label>
                                            )}
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                onFocus={() => setFocusedField('confirmPassword')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                placeholder={focusedField === 'confirmPassword' || confirmPassword ? '' : 'Confirm Password'}
                                                className="w-full bg-transparent text-slate-900 text-sm font-medium focus:outline-none placeholder-slate-400"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="text-slate-400 hover:text-slate-700 focus:outline-none p-1 transition-colors"
                                            aria-label="Toggle confirm password visibility"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            { }
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 px-4 mt-3 bg-[#0d1322] hover:bg-[#1a233a] active:scale-[0.99] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-slate-900/10 transition-all duration-200 flex items-center justify-center disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'SIGN UP'
                                )}
                            </button>

                        </form>
                    )}

                    { }
                    <div className="mt-8 text-center text-xs text-slate-400">
                        Already have an account?{' '}
                        <a
                            href="/auth/login"
                            className="text-slate-900 font-bold hover:underline transition-all"
                        >
                            Sign in
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
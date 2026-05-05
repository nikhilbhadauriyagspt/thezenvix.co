import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'user', identifier: email, password })
            });

            const data = await response.json();
            if (data.status === 'success') {
                localStorage.setItem('user', JSON.stringify(data.data));
                window.dispatchEvent(new Event('storage'));
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans overflow-hidden">
            <SEO title="Sign In | Registry Access | The Zenvix" />

            {/* Left: Branding Image (50%) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
                <img
                    src="/banner/category-imges/17.avif"
                    alt="Registry Access"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-blue-900/20" />

                <div className="relative z-10 flex flex-col justify-between p-16 w-full">
                    <Link to="/">
                        <img src="/logo/logo.avif" alt="The Zenvix" className="h-10 brightness-0 invert" />
                    </Link>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-[2px] bg-[#05718A]"></div>
                            <span className="text-[#05718A] font-bold text-sm tracking-normal uppercase">Customer Portal</span>
                        </div>
                        <h2 className="text-5xl xl:text-7xl font-bold text-white tracking-tighter leading-none">
                            Welcome <br />
                            <span className="text-[#05718A]">Back.</span>
                        </h2>
                        <p className="text-slate-300 text-lg max-w-md leading-relaxed">
                            Sign in to manage your orders, track shipments, and access your personal wishlist and account details.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="space-y-1">
                            <p className="text-[#05718A] font-bold text-sm uppercase">Secure Login</p>
                            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Protected Session</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Login Form (50%) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#f5f5f5]">
                <div className="w-full max-w-[480px] bg-white p-10 md:p-12 border border-slate-100 shadow-xl rounded-2xl space-y-10">
                    <div className="lg:hidden text-center mb-8">
                        <Link to="/">
                            <img src="/logo/logo.avif" alt="The Zenvix" className="h-10 mx-auto" />
                        </Link>
                    </div>

                    <div className="space-y-3 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Sign In</h1>
                        <p className="text-slate-500 font-medium">Enter your credentials to access your account.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <Link to="#" className="text-xs font-bold text-[#05718A] hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#05718A] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full h-14 bg-slate-900 text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-[#05718A] transition-all flex items-center justify-center gap-3 group shadow-lg shadow-slate-200"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-6 border-t border-slate-100 text-center space-y-6">
                        <p className="text-slate-600 font-medium">
                            New here?{' '}
                            <Link to="/signup" className="text-[#05718A] font-bold hover:underline">Create an Account</Link>
                        </p>

                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            Secure Encryption Active
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'user',
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                localStorage.setItem('user', JSON.stringify(data.data));
                window.dispatchEvent(new Event('storage'));
                navigate('/');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans overflow-hidden">
            <SEO title="Create Your Account | Registry Enrollment | The Zenvix" />

            {/* Left: Enrollment Form (50%) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#f5f5f5]">
                <div className="w-full max-w-[520px] bg-white p-10 md:p-12 border border-slate-100 shadow-xl rounded-2xl space-y-10">
                    <div className="lg:hidden text-center mb-8">
                        <Link to="/">
                            <img src="/logo/logo.avif" alt="The Zenvix" className="h-10 mx-auto" />
                        </Link>
                    </div>

                    <div className="space-y-3 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Create Account</h1>
                        <p className="text-slate-500 font-medium">Join us to start your professional printing journey.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Your full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Confirm</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-1">
                            <input
                                type="checkbox"
                                id="showPass"
                                onChange={(e) => setShowPassword(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-[#05718A] focus:ring-[#05718A] cursor-pointer"
                            />
                            <label htmlFor="showPass" className="text-xs font-bold text-slate-600 cursor-pointer">Show Passwords</label>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full h-14 bg-slate-900 text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-[#05718A] transition-all flex items-center justify-center gap-3 group shadow-lg shadow-slate-200"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    Create Account
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-600 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#05718A] font-bold hover:underline">Sign In Instead</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: Branding Image (50%) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
                <img
                    src="/banner/category-imges/18.avif"
                    alt="Enrollment Registry"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-blue-900/20" />

                <div className="relative z-10 flex flex-col justify-between p-16 w-full text-right items-end">
                    <Link to="/">
                        <img src="/logo/logo.avif" alt="The Zenvix" className="h-10 brightness-0 invert" />
                    </Link>

                    <div className="space-y-6">
                        <div className="flex items-center justify-end gap-3">
                            <span className="text-[#05718A] font-bold text-sm tracking-normal uppercase text-right">Join the Community</span>
                            <div className="w-10 h-[2px] bg-[#05718A]"></div>
                        </div>
                        <h2 className="text-5xl xl:text-7xl font-bold text-white tracking-tighter leading-none text-right">
                            Start Your <br />
                            <span className="text-[#05718A]">Journey.</span>
                        </h2>
                        <p className="text-slate-300 text-lg max-w-md ml-auto leading-relaxed">
                            Unlock specialized pricing, priority shipping, and a streamlined printing hardware experience today.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="space-y-1">
                            <p className="text-[#05718A] font-bold text-sm uppercase">Secure Signup</p>
                            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Privacy Protected</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



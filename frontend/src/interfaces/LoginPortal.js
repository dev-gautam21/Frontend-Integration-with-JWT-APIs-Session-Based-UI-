import React, { useState } from 'react';
import axios from 'axios';

const LoginPortal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post("http://localhost:8080/auth/signin", {
                username: email,
                password: password
            });

            if (response.status === 200) {
                const { token, username: sessionUser, role } = response.data;

                sessionStorage.setItem("user", sessionUser || email);
                sessionStorage.setItem("role", role);
                sessionStorage.setItem("token", token);

                if (role === "ADMIN") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/user";
                }
            }
        } catch (err) {
            setError("Authentication failed. Please verify credentials.");
        }
    };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col">
            {/* TopAppBar */}
            <header className="bg-[#f9f9f9] dark:bg-[#1A1A1A] flex items-center justify-between px-8 h-16 w-full fixed top-0 z-50">
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-[#5e5e5e] dark:text-[#f2f4f4] cursor-pointer hover:opacity-70 transition-opacity">
                        close
                    </span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="text-lg font-bold text-[#2d3435] dark:text-[#f8f8f8] tracking-widest font-['Manrope'] uppercase">
                        ATELIER
                    </h1>
                </div>
                <div className="w-6"></div>
            </header>

            {/* Main Content Canvas */}
            <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12">
                <div className="w-full max-w-md">
                    {/* Hero Aesthetic Section */}
                    <div className="mb-12 ml-2">
                        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-background leading-none mb-4">
                            The Digital<br/>Atelier
                        </h2>
                        <p className="text-on-surface-variant font-body text-sm tracking-wide">
                            Authenticating your creative workspace.
                        </p>
                    </div>

                    {/* Login Module */}
                    <div className="bg-surface-container-lowest ambient-shadow rounded-xl p-8 space-y-8">
                        {error && (
                            <div className="bg-error-container text-on-error-container p-4 rounded-lg text-xs font-semibold">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant px-1" htmlFor="email">
                                    Email Address
                                </label>
                                <input 
                                    className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline-variant focus:ring-0 focus:bg-surface-container-highest transition-all duration-300 outline-none" 
                                    id="email" 
                                    placeholder="name@atelier.com" 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant" htmlFor="password">
                                        Password
                                    </label>
                                    <a className="text-[11px] font-medium text-primary hover:text-primary-dim transition-colors duration-200" href="#">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input 
                                        className="w-full bg-surface-container-high border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-outline-variant focus:ring-0 focus:bg-surface-container-highest transition-all duration-300 outline-none" 
                                        id="password" 
                                        placeholder="••••••••" 
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span 
                                        className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant cursor-pointer text-xl"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "visibility" : "visibility_off"}
                                    </span>
                                </div>
                            </div>

                            {/* Remember Me Toggle */}
                            <div className="flex items-center space-x-3">
                                <button 
                                    type="button"
                                    className={`w-10 h-5 rounded-full relative transition-colors duration-300 focus:outline-none ${rememberMe ? 'bg-primary' : 'bg-secondary-container'}`}
                                    onClick={() => setRememberMe(!rememberMe)}
                                >
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ${rememberMe ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                </button>
                                <span className="text-sm font-medium text-on-surface-variant">Remember me</span>
                            </div>

                            {/* Sign In CTA */}
                            <div className="pt-2">
                                <button 
                                    type="submit"
                                    className="w-full primary-gradient text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg hover:translate-y-[-2px] transition-all duration-300 active:scale-[0.98] active:opacity-90 tracking-wide uppercase text-sm"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Optional Footer Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-on-surface-variant">
                            New? <a className="text-on-background font-semibold hover:underline underline-offset-4 decoration-primary/30" href="#">Request Access</a>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer Component */}
            <footer className="bg-[#f9f9f9] dark:bg-[#1A1A1A] flex flex-col md:flex-row justify-between items-center px-12 py-8 w-full border-t border-transparent">
                <div className="mb-4 md:mb-0">
                    <span className="font-['Inter'] text-[12px] tracking-wide text-[#5e5e5e] dark:text-[#f2f4f4]">
                        © 2024 THE DIGITAL ATELIER.
                    </span>
                </div>
                <div className="flex space-x-6">
                    <a className="font-['Inter'] text-[12px] tracking-wide text-[#5a6061] dark:text-[#adb3b4] hover:text-[#2d3435] dark:hover:text-[#ffffff] transition-colors" href="#">Privacy</a>
                    <a className="font-['Inter'] text-[12px] tracking-wide text-[#5a6061] dark:text-[#adb3b4] hover:text-[#2d3435] dark:hover:text-[#ffffff] transition-colors" href="#">Terms</a>
                    <a className="font-['Inter'] text-[12px] tracking-wide text-[#5a6061] dark:text-[#adb3b4] hover:text-[#2d3435] dark:hover:text-[#ffffff] transition-colors" href="#">Support</a>
                </div>
            </footer>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-surface-container-low opacity-40 blur-[100px]"></div>
                <div className="absolute -bottom-[10%] -left-[5%] w-[300px] h-[300px] rounded-full bg-surface-container opacity-30 blur-[80px]"></div>
            </div>
        </div>
    );
};

export default LoginPortal;

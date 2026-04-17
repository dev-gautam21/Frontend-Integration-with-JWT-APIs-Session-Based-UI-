import React, { useState } from "react";
import axios from "axios";

function Authentication() {
  const [userId, setUserId] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const executeSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        username: userId,
        password: secretKey
      });

      if (response.status === 200) {
        const { token, username: sessionUser, role } = response.data;

        sessionStorage.setItem("user", sessionUser || userId);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("token", token);

        if (role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/user";
        }
      }
    } catch (err) {
      alert("Authentication failed. Please verify credentials or server status.");
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased">
      {/* TopNavBar Component */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-16">
          <div className="text-xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-400 font-headline">Nova Platform</div>
          <div className="flex items-center space-x-4 font-headline">
            <button className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 px-4 py-2 transition-all">Support</button>
            <button className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2 rounded-full font-bold transition-all ease-out duration-300 hover:scale-[1.02]">Access Portal</button>
          </div>
        </div>
      </nav>

      {/* Main Content: Login Canvas */}
      <main className="min-h-screen flex items-center justify-center pt-16 pb-12 px-6 bg-ethereal-gradient">
        {/* Background Decorative Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-tertiary/5 rounded-full blur-[120px]"></div>
        </div>

        {/* Login Container */}
        <div className="relative w-full max-w-[480px]">
          <div className="bg-surface-container-lowest glass-panel rounded-xl p-10 border border-white/20 shadow-[0_12px_32px_rgba(0,61,155,0.06)]">
            {/* Brand Header */}
            <div className="mb-10 text-left">
              <h1 className="font-headline text-display-sm text-[2.25rem] font-extrabold tracking-tighter leading-tight mb-2 text-primary">
                Portal Access
              </h1>
              <p className="text-on-surface-variant font-body">Sign in to manage your ecosystem.</p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={executeSignIn}>
              <div className="space-y-2">
                <label className="block font-label text-sm font-semibold text-on-surface-variant px-1" htmlFor="userId">Username</label>
                <input
                  className="w-full h-12 px-4 rounded-lg bg-surface-container-high border-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 outline-none placeholder:text-outline/50"
                  id="userId"
                  placeholder="Your username"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block font-label text-sm font-semibold text-on-surface-variant" htmlFor="secretKey">Password</label>
                  <a className="text-sm font-medium text-primary hover:underline underline-offset-4 transition-all" href="#">Recovery</a>
                </div>
                <input
                  className="w-full h-12 px-4 rounded-lg bg-surface-container-high border-none ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 outline-none placeholder:text-outline/50"
                  id="secretKey"
                  placeholder="••••••••"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  className="w-full h-12 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300"
                  type="submit"
                >
                  Confirm Log In
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface-container-lowest px-4 text-on-surface-variant font-semibold tracking-widest">External Auth</span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center h-12 rounded-full bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container-high transition-all duration-300 space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-sm font-semibold text-on-surface">Goog</span>
              </button>
              <button className="flex items-center justify-center h-12 rounded-full bg-surface-container-low border border-outline-variant/10 hover:bg-surface-container-high transition-all duration-300 space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.96.95-2.12 1.72-3.48 1.72-1.31 0-1.77-.82-3.4-.82s-2.16.82-3.4.82c-1.34 0-2.6-.82-3.56-1.78C1.21 18.2 0 15.11 0 12.09c0-3.09 1.94-4.73 3.82-4.73 1.02 0 1.98.53 2.76.53s1.77-.57 2.94-.57c1.47 0 2.55.77 3.23 1.79-3.23 1.63-2.71 6.13.52 7.55-.7 1.63-1.71 3.24-3.22 3.62zm-3.04-14.8c0-1.92 1.65-3.48 3.51-3.48.06 0 .11 0 .17.01-.06 1.96-1.65 3.55-3.56 3.55-.04 0-.08 0-.12-.08z"></path>
                </svg>
                <span className="text-sm font-semibold text-on-surface">IoS</span>
              </button>
            </div>

            <div className="mt-10 text-center">
              <p className="text-on-surface-variant text-sm">
                New user? 
                <a className="text-primary font-bold hover:underline underline-offset-4 ml-1 transition-all" href="#">Join Nova</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto py-8 px-8 font-inter text-sm antialiased">
          <div className="font-manrope font-bold text-slate-900 dark:text-slate-100 mb-4 md:mb-0">Nova Digital</div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <span className="text-slate-500 dark:text-slate-400 opacity-80">© 2024 Nova Ecosystem. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Authentication;
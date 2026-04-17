import React from "react";
import axios from "axios";

function AdminNexus() {
  const accountRole = sessionStorage.getItem("role");
  const accountName = sessionStorage.getItem("user") || "Administrator";

  if (accountRole !== "ADMIN") {
    alert("Restricted Access: Administrative Credentials Required");
    window.location.href = "/";
  }

  const accessCode = sessionStorage.getItem("token");

  const getSecureData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${accessCode}`
        }
      });
      alert(response.data.message);
    } catch (err) {
      alert("Nexus API access failed");
    }
  };

  const getProfileRef = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/profile", {
        headers: {
          Authorization: `Bearer ${accessCode}`
        }
      });
      alert(response.data.message);
    } catch (err) {
      alert("Reference API linkage failed");
    }
  };

  const terminateSession = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col antialiased">
            {/* TopAppBar */}
            <header className="bg-[#f9f9f9] dark:bg-[#1A1A1A] flex items-center justify-between px-8 h-16 w-full fixed top-0 z-50">
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-[#5e5e5e] dark:text-[#f2f4f4] cursor-pointer hover:opacity-70 transition-opacity">
                        admin_panel_settings
                    </span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="text-lg font-bold text-[#2d3435] dark:text-[#f8f8f8] tracking-widest font-['Manrope'] uppercase">
                        ATELIER
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end hidden md:flex">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Nexus Admin</span>
                        <span className="text-xs font-medium text-on-surface-variant font-headline">{accountName}</span>
                    </div>
                    <button 
                        onClick={terminateSession} 
                        className="text-xs font-bold uppercase tracking-widest text-[#5e5e5e] hover:opacity-70 transition-opacity ml-4"
                    >
                        Terminate
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-32 pb-12 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-16 ml-2 flex justify-between items-end">
                        <div>
                            <h2 className="font-headline text-5xl font-extrabold tracking-tight text-on-background leading-none mb-4">
                                Admin<br/>Nexus
                            </h2>
                            <p className="text-on-surface-variant font-body text-sm tracking-wide">
                                Elevated command center for system-wide operations.
                            </p>
                        </div>
                        <div className="hidden lg:block text-right">
                            <span className="font-headline text-8xl font-black text-surface-container opacity-50 block leading-none select-none">
                                001
                            </span>
                        </div>
                    </div>

                    {/* Dashboard Module */}
                    <div className="bg-surface-container-lowest ambient-shadow rounded-xl p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            {/* Primary Controls */}
                            <div className="lg:col-span-2 space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">database</span>
                                        </div>
                                        <h3 className="font-headline text-xl font-bold text-on-background">Secure Metrics</h3>
                                        <p className="text-sm text-on-surface-variant leading-relaxed">
                                            Pull encrypted telemetry and high-level administrative data from core services.
                                        </p>
                                        <div className="pt-2">
                                            <button 
                                                onClick={getSecureData} 
                                                className="w-full primary-gradient text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg hover:translate-y-[-2px] transition-all duration-300 active:scale-[0.98] uppercase text-xs tracking-widest"
                                            >
                                                Access Metrics
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary">groups</span>
                                        </div>
                                        <h3 className="font-headline text-xl font-bold text-on-background">Operator Registry</h3>
                                        <p className="text-sm text-on-surface-variant leading-relaxed">
                                            Manage and verify active member identities across the entire digital ecosystem.
                                        </p>
                                        <div className="pt-2">
                                            <button 
                                                onClick={getProfileRef} 
                                                className="w-full bg-surface-container-high text-on-surface font-headline font-bold py-4 rounded-xl hover:bg-surface-container-highest transition-all duration-300 active:scale-[0.98] uppercase text-xs tracking-widest"
                                            >
                                                Index Profiles
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / Status */}
                            <div className="bg-surface-container-low/50 rounded-xl p-6 h-fit space-y-6">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">System Status</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-on-surface-variant">Nexus API</span>
                                        <span className="flex items-center text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                                            Active
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-on-surface-variant">Security Layer</span>
                                        <span className="flex items-center text-primary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                                            Encrypted
                                        </span>
                                    </div>
                                    <div className="pt-4 border-t border-outline-variant/30">
                                        <p className="text-[10px] text-outline leading-relaxed italic">
                                            "Precision is the foundation of authority."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-surface-container-high opacity-20 blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-surface-container opacity-20 blur-[100px]"></div>
            </div>

            {/* Footer */}
            <footer className="px-12 py-8 w-full mt-auto">
                <div className="flex justify-center">
                    <span className="font-['Inter'] text-[10px] tracking-[0.2em] text-outline uppercase">
                        © 2024 THE DIGITAL ATELIER • ADMIN PORTAL
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default AdminNexus;
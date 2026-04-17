import React from "react";
import axios from "axios";

function UserInterface() {
  const accountPermissions = sessionStorage.getItem("role");
  const displayName = sessionStorage.getItem("user") || "Member";

  if (!accountPermissions) window.location.href = "/";

  const securityToken = sessionStorage.getItem("token");

  const loadAccountData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/profile", {
        headers: {
          Authorization: `Bearer ${securityToken}`
        }
      });
      alert(response.data.message);
    } catch (err) {
      alert("Account synchronization failed");
    }
  };

  const endSession = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

    return (
        <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col antialiased">
            {/* TopAppBar */}
            <header className="bg-[#f9f9f9] dark:bg-[#1A1A1A] flex items-center justify-between px-8 h-16 w-full fixed top-0 z-50">
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-[#5e5e5e] dark:text-[#f2f4f4] cursor-pointer hover:opacity-70 transition-opacity">
                        menu
                    </span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="text-lg font-bold text-[#2d3435] dark:text-[#f8f8f8] tracking-widest font-['Manrope'] uppercase">
                        ATELIER
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-on-surface-variant hidden md:inline">
                        {displayName}
                    </span>
                    <button 
                        onClick={endSession} 
                        className="text-xs font-bold uppercase tracking-widest text-[#5e5e5e] hover:opacity-70 transition-opacity"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-32 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-16 ml-2">
                        <h2 className="font-headline text-5xl font-extrabold tracking-tight text-on-background leading-none mb-4">
                            Member<br/>Workspace
                        </h2>
                        <p className="text-on-surface-variant font-body text-sm tracking-wide">
                            Access your creative tools and digital assets.
                        </p>
                    </div>

                    {/* Content Module */}
                    <div className="bg-surface-container-lowest ambient-shadow rounded-xl p-8 space-y-12">
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="font-headline text-xl font-bold text-on-background">Identity & Sync</h3>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Manage your professional identity and synchronize your workspace data across all devices.
                                </p>
                                <div className="pt-2">
                                    <button 
                                        onClick={loadAccountData} 
                                        className="w-full primary-gradient text-on-primary font-headline font-bold py-4 rounded-xl shadow-lg hover:translate-y-[-2px] transition-all duration-300 active:scale-[0.98] uppercase text-xs tracking-widest"
                                    >
                                        Synchronize Profile
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 opacity-50">
                                <h3 className="font-headline text-xl font-bold text-on-background">Project Archives</h3>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Browse through your historical records and archived creative projects.
                                </p>
                                <div className="pt-2">
                                    <button 
                                        disabled 
                                        className="w-full bg-surface-container-high text-on-surface-variant font-headline font-bold py-4 rounded-xl uppercase text-xs tracking-widest cursor-not-allowed"
                                    >
                                        Archived
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-surface-container-low opacity-40 blur-[100px]"></div>
                <div className="absolute -bottom-[10%] -left-[5%] w-[300px] h-[300px] rounded-full bg-surface-container opacity-30 blur-[80px]"></div>
            </div>

            {/* Footer */}
            <footer className="px-12 py-8 w-full">
                <div className="flex justify-center">
                    <span className="font-['Inter'] text-[10px] tracking-[0.2em] text-outline uppercase">
                        © 2024 THE DIGITAL ATELIER.
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default UserInterface;
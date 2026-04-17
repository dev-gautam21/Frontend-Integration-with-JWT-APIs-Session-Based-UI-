import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPortal from "./interfaces/LoginPortal";
import UserInterface from "./interfaces/UserInterface";
import AdminNexus from "./interfaces/AdminNexus";

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const userRole = sessionStorage.getItem("role");
  const isUserAuthenticated = !!sessionStorage.getItem("token");

  useEffect(() => {
    const onLocationChange = () => setCurrentRoute(window.location.pathname);
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  // Root path handling
  if (currentRoute === "/") {
    if (isUserAuthenticated) {
      if (userRole === "ADMIN") return <AdminNexus />;
      if (userRole === "USER") return <UserInterface />;
    }
    return <LoginPortal />;
  }

  // Admin Route Protection
  if (currentRoute === "/admin") {
    if (!isUserAuthenticated) return <LoginPortal />;
    if (userRole !== "ADMIN") {
      // Automatic downgrade/redirect for unauthorized admin access
      return <UserInterface />; 
    }
    return <AdminNexus />;
  }

  // User Route Protection
  if (currentRoute === "/user") {
    if (!isUserAuthenticated) return <LoginPortal />;
    // Admins can also see user dashboard
    return <UserInterface />;
  }

  // Catch-all redirect to appropriate dashboard or login
  return isUserAuthenticated ? (userRole === "ADMIN" ? <AdminNexus /> : <UserInterface />) : <LoginPortal />;
}

export default App;


import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: string[]; 
}

const ProtectedRoute: React.FC<RequireRoleProps> = ({ children, allowedRoles }) => {
  const auth = useAuth();
  const hasRedirected = useRef(false);

  const userRole = auth?.user?.role || "";
  if (!auth?.user && !hasRedirected.current) {
    hasRedirected.current = true;
    toast.error("Please login first");
    return <Navigate to="/login" />;
  }

  
  if (userRole !== "admin" && !allowedRoles.includes(userRole) && !hasRedirected.current) {
    hasRedirected.current = true;
    toast.error("You don't have permission");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

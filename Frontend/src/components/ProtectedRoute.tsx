import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<RequireRoleProps> = ({ children, allowedRoles }) => {
  const auth = useAuth();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (auth?.isLoading) return;

    if (!auth?.user) {
      toast.error("กรุณาเข้าสู่ระบบ");
      setRedirectPath("/login");
    } else if (!allowedRoles.includes(auth.user.role)) {
      toast.error("ไม่มีสิทธิ์เข้าถึง!");
      setRedirectPath("/");
    }
  }, [auth?.isLoading, auth?.user, allowedRoles]);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

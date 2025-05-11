import { useEffect, useState, useRef } from "react";
import { FaUser, FaShieldAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, ChevronUp , LayoutDashboard } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
function Username() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [username, setUsername] = useState("guest");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (auth) {
      setUsername(auth.user?.username || "guest");
    }
  }, [auth?.user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getRoleColor = (role: string | undefined) => {
    switch (role) {
      case "admin":
        return "text-red-500";
      case "member":
        return "text-blue-500";
      default:
        return "";
    }
  };

  const roleClass = getRoleColor(auth?.user?.role);

  const { logout } = useLogout();
  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res?.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 200);
  };

  return (
    <div className="flex items-center">
      {auth?.isLogin && auth?.user ? (
        <div
          className="flex items-center  relative"
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center">
            <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center mr-2 overflow-hidden">
              <FaUser className="text-gray-500 text-xs" />
            </div>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md transition-all duration-300 hover:cursor-pointer hover:text-blue-500 group"
            >
              <span className="mr-1">{username}</span>
              <span className="h-5 w-5 flex items-center justify-center">
                {isProfileOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </span>
            </button>
          </div>

          <div className="flex items-center px-2 py-1 rounded-md bg-opacity-10">
            <FaShieldAlt className={`text-sm ${roleClass} mr-1`} />
            <span className={`font-medium capitalize text-xs ${roleClass}`}>
              {auth.user?.role}
            </span>
          </div>

          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 navbar-bg border border-gray-200 shadow-lg rounded-lg z-50 text-sm overflow-hidden transform origin-top-right transition-all duration-200 animate-fadeIn">
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <FaUser className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-base">{username}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {auth.user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${roleClass} bg-opacity-10`}
                  >
                    <FaShieldAlt className="mr-1 text-xs" />
                    {auth.user?.role}
                  </span>
                </div>
              </div>

              <div className="py-1">
                <Link to={"/user/setting"}>
                  <button className="w-full text-left px-4 py-3 font-medium hover:cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center">
                    <FaCog className="mr-3 w-5" />
                    <span>ตั้งค่าบัญชี</span>
                  </button>
                </Link>
              </div>
              {auth.user?.role === "admin" && (
                <div className="py-1">
                  <Link to={"/dashboard"}>
                    <button className="w-full text-left px-4 py-3 font-medium hover:cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200 flex items-center">
                      <LayoutDashboard className="mr-3 w-5" />
                      <span>Dashboard</span>
                    </button>
                  </Link>
                </div>
              )}

              <div className="py-1 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 font-medium hover:cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center"
                >
                  <FaSignOutAlt className="mr-3" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to="/login" className="mr-2">
            <button
              className={`text-xs flex items-center py-1 px-4 text-[#4f39f6] border border-[#4f39f6] rounded-md transition-all duration-500 hover:bg-[#4f39f6] hover:text-white hover:border-[#4f39f6] hover:cursor-pointer focus:outline-none
                ${
                  location.pathname === "/login"
                    ? "bg-[#4f39f6] text-white"
                    : "bg-[#4f39f6]/20"
                }`}
            >
              <FaUser className="text-sm mr-2" /> เข้าสู่ระบบ
            </button>
          </Link>
          <Link to="/register">
            <button
              className={`text-xs flex items-center py-1 px-4 text-[#FF7043] border border-[#FF7043] rounded-md transition-all duration-500 hover:bg-[#FF7043] hover:text-white hover:border-[#FF7043] hover:cursor-pointer focus:outline-none
                ${
                  location.pathname === "/register"
                    ? "bg-[#FF7043] text-white"
                    : "bg-[#FF7043]/20"
                }`}
            >
              <FaUser className="text-sm mr-2" /> สมัครสมาชิก
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Username;

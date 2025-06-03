import { useEffect, useState, useRef } from "react";
import { FaUser, FaShieldAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, ChevronUp, LayoutDashboard } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
function Username() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [firstName, setFirstName] = useState("guest");
  const [lastName, setLastName] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (auth) {
      setFirstName(auth.user?.firstName || "");
      setLastName(auth.user?.lastName || "");
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
              <span className="mr-1">{firstName}</span>
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
            <div className="absolute top-full -left-15 mt-2 w-70 bg-white shadow-2xl rounded-2xl z-50 text-sm overflow-hidden transform origin-top-right transition-all duration-300 ease-out ">
              {/* Header Section */}
              <div className="relative  px-6 py-5 bg-gradient-to-r from-blue-500 to-indigo-600">
                <div className="absolute inset-0 bg-black opacity-5"></div>
                <div className="relative">
                  <div className="flex items-center mb-3 gap-4">
                    <div className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
                      <FaUser className="text-white text-sm w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-white">
                        {firstName + " " + lastName}
                      </p>
                      <p className="text-xs text-blue-100 opacity-90">
                        {auth.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 gap-2 shadow-sm`}
                    >
                      <FaShieldAlt className="w-3 h-3" />
                      {auth.user?.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link to={"/user/profile"}>
                  <button className="w-full text-left px-6 py-3.5 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 flex items-center gap-4 transition-all duration-200 group hover:cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-all duration-200">
                      <FaCog className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm">ตั้งค่าบัญชี</span>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                        จัดการข้อมูลส่วนตัว
                      </p>
                    </div>
                  </button>
                </Link>

                {auth.user?.role === "admin" && (
                  <Link to={"/dashboard"}>
                    <button className="w-full text-left px-6 py-3.5 font-medium text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 flex items-center gap-4 transition-all duration-200 group hover:cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 transition-all duration-200">
                        <LayoutDashboard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm">แดชบอร์ด</span>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                          จัดการระบบ
                        </p>
                      </div>
                    </button>
                  </Link>
                )}

                {/* Divider */}
                <div className="my-2 px-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-6 py-3.5 font-medium text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 flex items-center gap-4 transition-all duration-200 group hover:cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-all duration-200">
                    <FaSignOutAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm">ออกจากระบบ</span>
                    <p className="text-xs sm:text-sm text-red-400 mt-0.5">
                      ออกจากบัญชีผู้ใช้
                    </p>
                  </div>
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

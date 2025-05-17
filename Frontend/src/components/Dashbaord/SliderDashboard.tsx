import {
  FilePlus,
  Activity,
  Settings,
  BarChart3,
  Layers,
  Users,
  Shield,
  XIcon,
  LibraryBig
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { RiMenuFold2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

function SliderDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation(); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      icon: <BarChart3 className="w-5 h-5 mr-3" />,
      label: "แดชบอร์ด",
      link: "/dashboard",
    },
    {
      icon: <Users className="w-5 h-5 mr-3" />,
      label: "จัดการผู้ใช้",
      link: "/dashboard/manage-users",
    },
    {
      icon: <LibraryBig className="w-5 h-5 mr-3" />,
      label: "จัดการวิชา",
      link: "/dashboard/manage-subjects",
    },
    {
      icon: <FilePlus className="w-5 h-5 mr-3" />,
      label: "จัดการงาน",
      link: "/dashboard/manage-works",
    },
    {
      icon: <Activity className="w-5 h-5 mr-3" />,
      label: "รายงานระบบ",
      link: "/dashboard/system",
    },
    {
      icon: <Settings className="w-5 h-5 mr-3" />,
      label: "ตั้งค่า",
      link: "/dashboard/setting",
    },
    {
      icon: <Shield className="w-5 h-5 mr-3" />,
      label: "การรักษาความปลอดภัย",
      link: "/dashboard/security",
    },
  ];

  return (
    <div className="relative h-full">
      {!isOpen && (
        <div
          onClick={toggleNavbar}
          className="sm:hidden fixed top-5 left-3.5 z-50"
        >
          <div className="bg-blue-500 absolute -top-1 -right-8 w-10 h-10 rounded flex items-center justify-center shadow cursor-pointer hover:bg-blue-600 transition-colors duration-300">
            <RiMenuFold2Line className="w-7 h-7 text-white" />
          </div>
        </div>
      )}

      <div
        ref={navbarRef}
        className={`fixed top-0 left-0 h-full z-40  navbar transition-all duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full "}
        w-[250px] sm:w-[300px] sm:static sm:translate-x-0`}
      >
        <div className="p-6 cursor-default flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600 flex items-center">
            <Layers className="w-6 h-6 mr-2" />
            ระบบจัดการ
          </h2>
          {isOpen && (
            <div className="flex items-center justify-center sm:hidden">
              <button
                onClick={toggleNavbar}
                className="hover:text-blue-500 hover:cursor-pointer transition-colors duration-300"
              >
                <XIcon className="w-7 h-7" />
              </button>
            </div>
          )}
        </div>

        <div className="px-4 py-2 max-sm:px-3 max-sm:py-1 max-sm:text-xs">
          {menuItems.map(({ icon, label, link }) => {
            const isActive = location.pathname === link;
            return (
              <Link key={label} to={link}>
                <div
                  className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer 
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {icon}
                  <span className="font-medium">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SliderDashboard;

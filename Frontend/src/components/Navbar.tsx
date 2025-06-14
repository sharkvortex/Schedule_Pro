import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiMenuFold2Line, RiMenuUnfold2Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { useSubject } from "../hooks/admin/useSubject";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { subjects } = useSubject();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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

  return (
    <nav ref={navbarRef} className="relative flex-shrink-0 h-screen">
      <button
        onClick={toggleNavbar}
        aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
        className="absolute z-10 -right-6 top-6 p-3 bg-blue-500 text-white rounded-full transition-all duration-300 hover:translate-x-1 hover:cursor-pointer hover:border-blue-500"
      >
        <div className="text-lg">
          {isOpen ? <RiMenuUnfold2Fill /> : <RiMenuFold2Line />}
        </div>
      </button>

      <div
        className={`
          h-full   
          transition-all duration-500 ease-out overflow-hidden pb-[62px]
          ${isOpen ? "w-64" : "w-0"}
        `}
      >
        <div className="flex flex-col h-full w-64">
          <div className="h-20 flex items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-800">เมนู</h2>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              <Link to="/">
                <div className="group flex items-center px-4 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-100">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200 shadow-sm">
                    <FaHome className="text-white text-sm" />
                  </div>
                  <span className="ml-3  font-medium group-hover:text-blue-700 transition-colors duration-200">
                    หน้าหลัก
                  </span>
                </div>
              </Link>

              <div className="my-4"></div>
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold  uppercase tracking-wider">
                  วิชาเรียน
                </h3>
              </div>
              <div className="space-y-1">
                {subjects?.map((subject) => (
                  <Link key={subject.id} to={`/subject/${subject.subject_id}`}>
                    <div
                      className={`
          group flex items-center px-4 py-5 my-2 rounded-xl
          transition-all duration-200 cursor-pointer overflow-hidden
          ${
            location.pathname === `/subject/${subject.subject_id}`
              ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
              : "hover:bg-blue-50 border-transparent hover:text-blue-700 hover:border-blue-500"
          }
        `}
                      title={subject.subject_name}
                    >
                      <div className="ml-3 flex-1 min-w-0">
                        <span className="block font-medium truncate transition-colors duration-200 text-sm">
                          {subject.subject_name}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 ">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs  font-medium">
                {subjects?.length || 0} วิชา
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiMenuFold2Line, RiMenuUnfold2Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
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
    <nav
      ref={navbarRef}
      className="min-h-screen relative mr-[50px]  rounded-tr-sm duration-1000 shadow"
    >
      <div
        onClick={toggleNavbar}
        className="absolute z-10 -right-11 p-2  sm:text-2xl bg-[#4f39f6]/50 hover:bg-[#4f39f6] rounded duration-1000 hover:cursor-pointer"
      >
        <div className="text-white ">
          {isOpen ? <RiMenuUnfold2Fill /> : <RiMenuFold2Line />}
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "w-[200px]" : "w-[0px]"
        } h-full overflow-hidden`}
      >
        <div
          className={`flex h-full flex-col items-center justify-between p-4 pb-[75px]`}
        >
          <nav className="w-full overflow-hidden text-sm mt-4  text-nowrap">
            
            <Link to={"/"}>
              <button className="flex text-center items-center w-full p-1 sm:p-2 bg-[#4f39f683]/20 hover:bg-[#4f39f6] hover:text-white hover:cursor-pointer rounded  duration-500">
                <FaHome className="text-2xl mx-3" /> หน้าหลัก
              </button>
            </Link>
          </nav>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function Username() {
  const auth = useAuth();
  
  const [username, setUsername] = useState('guest');
  const location = useLocation();

  useEffect(()=>{
    if(auth){
      setUsername(auth.user?.username || "guest");
    }
  },[auth?.user])
  return (
    <div className="flex items-center space-x-4">
      {auth?.isLogin && auth?.user ? (
        <>
          <FaUser className="text-xl" />
          <span className='cursor-default' >{username}</span>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className={`text-xs flex items-center py-1 px-4  text-[#4f39f6] border border-[#4f39f6] rounded-md transition-all duration-500 hover:bg-[#4f39f6] hover:text-white hover:border-[#4f39f6] hover:cursor-pointer focus:outline-none
              ${location.pathname === '/login' ? 'bg-[#4f39f6] text-white' : 'bg-[#4f39f6]/20'} 
              `}>
              <FaUser className="text-xl mr-2" /> เข้าสู่ระบบ
            </button>
          </Link>
          <Link to="/register">
            <button className={`text-xs flex items-center py-1 px-4 text-[#FF7043] border border-[#FF7043] rounded-md transition-all duration-500 hover:bg-[#FF7043] hover:text-white hover:border-[#FF7043] hover:cursor-pointer focus:outline-none
              ${location.pathname === '/register' ? 'bg-[#FF7043] text-white' : 'bg-[#FF7043]/20'} 
              `}>
              <FaUser className="text-xl mr-2" /> สมัครสมาชิก
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Username;

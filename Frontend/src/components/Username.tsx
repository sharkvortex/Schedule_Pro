import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Username() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('guest');

  return (
    <div className="flex items-center space-x-4">
      {isLogin ? (
        <>
          <FaUser className="text-xl" />
          <span className='cursor-default' >{username}</span>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="text-xs flex items-center py-1 px-4 bg-[#4f39f6]/20 text-[#4f39f6] border border-[#4f39f6] rounded-md transition-all duration-500 hover:bg-[#4f39f6] hover:text-white hover:border-[#4f39f6] hover:cursor-pointer focus:outline-none">
              <FaUser className="text-xl mr-2" /> เข้าสู่ระบบ
            </button>
          </Link>
          <Link to="/register">
            <button className="text-xs flex items-center py-1 px-4 bg-[#FF7043]/20 text-[#FF7043] border border-[#FF7043] rounded-md transition-all duration-500 hover:bg-[#FF7043] hover:text-white hover:border-[#FF7043] hover:cursor-pointer focus:outline-none">
              <FaUser className="text-xl mr-2" /> สมัครสมาชิก
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Username;

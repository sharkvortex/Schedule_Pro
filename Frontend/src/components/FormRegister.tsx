import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Mail, Lock, User, BadgeCheck, IdCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

type FormRegisterProps = {
  studentId: string | number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function FormRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormRegisterProps>({
    studentId: 0 || '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="w-full flex justify-center items-center min-h-screen px-3">
      <form className="w-full sm:w-[420px] md:w-[500px] lg:w-[600px] xl:w-[700px] p-8 space-y-6 border border-gray-300/20 rounded-2xl shadow-xl">
        <div className="text-center space-y-1 w-full">
          <div className="flex justify-center">
            <div className="bg-blue-500 p-3 rounded-full">
              <BadgeCheck className="text-white" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-xs text-gray-400">Please fill in your details to register</p>
        </div>

        <button
          type="button"
          className="flex text-sm items-center justify-center gap-2 w-full bg-white text-black font-medium py-2 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer transition-colors"
        >
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="flex-shrink mx-4 text-gray-400">or continue with</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <div className="space-y-4">

          <div className="relative">
            <label className="text-sm font-medium">Student ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IdCard size={18} className="text-gray-500" />
              </div>
              <input
                type="number"
                placeholder="Enter your student ID"
                className="w-full pl-10 pr-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                onChange={(e) => setFormData({ ...formData, studentId: parseInt(e.target.value) })}
                value={formData.studentId}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  value={formData.firstName}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  value={formData.lastName}
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Create a username"
                className="w-full pl-10 pr-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                value={formData.username}
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-300" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                value={formData.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-300" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormRegister;

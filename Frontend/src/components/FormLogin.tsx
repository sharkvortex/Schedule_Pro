import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

type FormLoginProps = {
  email: string;
  password: string;
}

function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormLoginProps>({
    email: '',
    password: ''
  });

  return (
    <div className="w-full flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:w-[400px] md:w-[420px] lg:w-[450px] p-8 space-y-6 border border-gray-300/20 rounded-2xl shadow-xl">
        <div className="text-center space-y-2 w-full">
          <div className="flex justify-center">
            <div className="bg-blue-500 p-3 rounded-full">
              <Lock className="text-white" size={24} />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-400">Please enter your details to continue</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
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

          <div className="flex justify-between items-center text-sm">
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white font-medium py-2 rounded-lg transition-colors duration-200"
          >
            Sign In
          </button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">or continue with</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 flex justify-center items-center gap-2 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white hover:cursor-pointer transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                <path fill="#FBBC05" d="M5.277 14.268a7.12 7.12 0 0 1-.411-2.364 7.12 7.12 0 0 1 .411-2.364l-4.04-3.115A11.954 11.954 0 0 0 0 12c0 1.93.456 3.752 1.24 5.335l4.038-3.067Z" />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">Sign up now</Link>
        </p>
      </div>
    </div>
  );
}

export default FormLogin;

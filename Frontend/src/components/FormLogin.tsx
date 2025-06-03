import React from "react";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { toast } from "react-hot-toast";
import Loading from "./UI/Loading";
import GoogleLoginButton from "../hooks/Google/GoogleLoginButton";
type FormLoginProps = {
  username: string;
  password: string;
  checked: boolean;
};

function FormLogin() {
  const navigate = useNavigate()
  const { login, loading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormLoginProps>({
    username: "",
    password: "",
    checked: false,
  });

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return toast.error("Please enter username or password");
    }

    try{
      const res = await login(formData);
      if (res?.status === 200) {
        navigate("/");
      }
    }catch(error){
      console.log(error)
    }
  };

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
          <p className="text-sm text-gray-400">
            Please enter your details to continue
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Username , Email or Student ID"
                  className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  value={formData.username}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-400 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-400 hover:text-gray-300"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="text-gray-400 hover:text-gray-300"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="inline-flex items-center gap-2 text-gray-300">
                <input
                  checked={formData.checked}
                  onChange={(e) =>
                    setFormData({ ...formData, checked: e.target.checked })
                  }
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <span>Remember me</span>
              </label>
              <a
                href="/auth/resetpassword"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center text-sm  text-white font-medium py-2 rounded-lg transition-colors duration-200
    ${
      loading
        ? "cursor-not-allowed bg-blue-300"
        : "bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
    }
  `}
            >
              {loading ? <Loading size={18} /> : "Sign Up"}
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-400">
                or continue with
              </span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
          </div>
        </form>
        <GoogleLoginButton/>
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormLogin;

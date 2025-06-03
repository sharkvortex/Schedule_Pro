import { useState } from "react";
import { Mail, Lock, User, BadgeCheck, IdCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import Loading from "./UI/Loading";
import GoogleLoginButton from "../hooks/Google/GoogleLoginButton";
type FormRegisterProps = {
  studentId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function FormRegister() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<FormRegisterProps>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialFormState = {
    studentId: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState<FormRegisterProps>(initialFormState);

  const validateForm = () => {
    const newErrors: Partial<FormRegisterProps> = {};
    const forbiddenWords = [
      "admin",
      "root",
      "god",
      "superuser",
      "administrator",
      "bot",
      "shit",
      "fuck",
      "bitch",
      "asshole",
      "dick",
      "pussy",
      "fucker",
      "nigger",
      "bastard",
      "slut",
      "whore",
      "cunt",
      "douche",
      "retard",
      "bimbo",
      "dumbass",
      "cock",
      "prick",
      "twat",
      "wanker",
      "chink",
      "spic",
      "gook",
      "fag",
      "dyke",
      "piss",
      "shithead",
      "motherfucker",
      "cockhead",
      "fucking",
      "shitstorm",
      "dickhead",
      "bastards",
      "asshat",
      "crackhead",
      "pussyface",
      "whorebag",
      "slutty",
      "suckmyass",
      "fuckyourself",
      "assholebag",
      "cocksucker",
      "fags",
      "jerkoff",
      "cumdumpster",
      "sexslave",
      "pimp",
      "bastardize",
      "prickhead",
      "dickbag",
      "sodomizer",
      "fistfuck",
      "shithole",
      "shitsucker",
      "clit",
      "anal",
      "butt",
      "tits",
      "cocks",
      "twatwaffle",
      "dicklicker",
      "peckerhead",
      "jizz",
      "nutshot",
      "pussylicker",
      "assmunch",
      "boobies",
      "fap",
      "fucktard",
      "lardass",
      "blowjob",
      "gaylord",
      "suckass",
      "hardon",
      "shemale",
      "dickwad",
      "freakin",
      "shitfuck",
      "fuckingfool",
      "stfu",
      "faggy",
      "shitfaced",
      "buttplug",
      "cocksucking",
      "lickass",
      "cumwhore",
      "sluttywhore",
      "dirtywhore",
      "sexybitch",
      "cockslut",
      "sexuallyexplicit",
    ];

    const containsForbiddenWord = (value: string) =>
      forbiddenWords.some((word) => value.toLowerCase().includes(word));

    if (!formData.studentId) {
      newErrors.studentId = "Student ID is required";
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    } else if (containsForbiddenWord(formData.firstName)) {
      newErrors.firstName = "First name contains forbidden words";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (containsForbiddenWord(formData.lastName)) {
      newErrors.lastName = "Last name contains forbidden words";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length <= 5) {
      newErrors.username = "Username must be longer than 5 characters";
    } else if (containsForbiddenWord(formData.username)) {
      newErrors.username = "Username contains forbidden words";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    } else if (containsForbiddenWord(formData.email)) {
      newErrors.email = "Email contains forbidden words";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof FormRegisterProps) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const { register, loading } = useRegister();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await register(formData);
      if (res?.status === 201) {
        setFormData(initialFormState);
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center min-h-screen px-3">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-[420px] md:w-[500px] lg:w-[600px] xl:w-[700px] p-8 space-y-6 border border-gray-300/20 rounded-2xl shadow-xl"
        >
          <div className="text-center space-y-1 w-full">
            <div className="flex justify-center">
              <div className="bg-blue-500 p-3 rounded-full">
                <BadgeCheck className="text-white" size={24} />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-xs text-gray-400">
              Please fill in your details to register
            </p>
          </div>

          {/* GOOGLE AUTH */}
          <GoogleLoginButton />
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">
              or continue with
            </span>
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
                  className={`w-full pl-10 pr-4 py-3 border border-gray-400 focus:border-blue-500 rounded-lg placeholder-gray-400 focus:outline-none  transition-all duration-200 
                  ${errors.studentId && "border-red-500"}`}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData({
                      ...formData,
                      studentId: value,
                    });

                    if (value !== "") {
                      clearError("studentId");
                    }
                  }}
                  value={formData.studentId}
                />
              </div>
              {errors.studentId && (
                <p className="text-sm text-red-500 mt-1">{errors.studentId}</p>
              )}
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
                    className={`w-full pl-10 pr-4 py-3 border border-gray-400 focus:border-blue-500 rounded-lg placeholder-gray-400 focus:outline-none  transition-all duration-200
                    ${errors.firstName && "border-red-500"}
                    `}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        firstName: value,
                      });

                      if (value !== "") {
                        clearError("firstName");
                      }
                    }}
                    value={formData.firstName}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
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
                    className={`w-full pl-10 pr-4 py-3 border border-gray-400  focus:border-blue-500 rounded-lg placeholder-gray-400 focus:outline-none  transition-all duration-200
                    ${errors.lastName && "border-red-500"}
                    `}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFormData({
                        ...formData,
                        lastName: value,
                      });

                      if (value !== "") {
                        clearError("lastName");
                      }
                    }}
                    value={formData.lastName}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                )}
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
                  className={`w-full pl-10 pr-4 py-3 border border-gray-400 focus:border-blue-500 rounded-lg placeholder-gray-400 focus:outline-none  transition-all duration-200
                  ${errors.username && "border-red-500"}
                  `}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData({
                      ...formData,
                      username: value,
                    });

                    if (value !== "") {
                      clearError("username");
                    }
                  }}
                  value={formData.username}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username}</p>
              )}
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
                  className={`w-full pl-10 pr-4 py-3 border border-gray-400 focus:border-blue-500 rounded-lg placeholder-gray-400 focus:outline-none  transition-all duration-200
                  ${errors.email && "border-red-500"}
                  `}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData({
                      ...formData,
                      email: value,
                    });

                    if (value !== "") {
                      clearError("email");
                    }
                  }}
                  value={formData.email}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border border-gray-400 focus:border-blue-500 rounded-lg placeholder-gray-400 focus:outline-none  transition-all duration-200
                  ${errors.password && "border-red-500"}
                  `}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData({
                      ...formData,
                      password: value,
                    });

                    if (value !== "") {
                      clearError("password");
                    }
                  }}
                  value={formData.password}
                />
                <button
                  tabIndex={-1}
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
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-12 py-3 border border-gray-400 focus:border-blue-500 rounded-lg placeholder-gray-400 focus:outline-none  transition-all duration-200
                  ${errors.confirmPassword && "border-red-500"}
                  `}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData({
                      ...formData,
                      confirmPassword: value,
                    });

                    if (value !== "") {
                      clearError("confirmPassword");
                    }
                  }}
                  value={formData.confirmPassword}
                />
                <button
                  tabIndex={-1}
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
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
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
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

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormRegister;

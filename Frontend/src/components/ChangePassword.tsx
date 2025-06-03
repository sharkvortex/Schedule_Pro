import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface ChangePasswordFormProps {
  token: string;
}

function ChangePassword({token }: ChangePasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (token: string, password: string) => {
    setLoading(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        { password },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("เปลี่ยนรหัสผ่านสำเร็จ! 🎉");
      navigate("/login");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    const passwordPattern = /^[A-Za-z0-9]+$/;
    if (!passwordPattern.test(password)) {
      toast.error("รหัสผ่านต้องเป็นตัวอักษรภาษาอังกฤษหรือตัวเลขเท่านั้น");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน");
      return;
    }

    resetPassword(token, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          ตั้งรหัสผ่านใหม่
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              รหัสผ่านใหม่
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="อย่างน้อย 6 ตัวอักษร"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none transition placeholder:text-gray-300 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              ยืนยันรหัสผ่านใหม่
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="กรอกอีกครั้งให้ตรงกัน"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl transition placeholder:text-gray-300 pr-12"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
          >
            {loading ? "กำลังบันทึก..." : "บันทึกรหัสผ่านใหม่"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;

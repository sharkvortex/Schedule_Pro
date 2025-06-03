import React, { useState, useEffect } from "react";
import { MailIcon, CheckCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useResetPassword } from "../hooks/useResetpassword";
import { useNavigate } from "react-router-dom";
import Loading from "./UI/Loading";
function ResetPassword() {
  const { resetPassword, sending } = useResetPassword();
  const [email, setEmail] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("กรุณากรอกอีเมลของคุณ");
      return;
    }
    try {
      await resetPassword(email);
      setIsSuccess(true);
      toast.success("ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว");
    } catch (error:any) {
      toast.error(error.message ||"เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      {isSuccess ? (
        <SuccessSendMail />
      ) : (
        <>
          <div className="max-w-md w-full border border-gray-50/20 shadow rounded-2xl p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
                <MailIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                รีเซ็ตรหัสผ่าน
              </h2>
              <p className="text-sm text-gray-500 mt-1 text-center">
                ป้อนอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  อีเมล
                </label>
                <input
                  disabled={sending}
                  type="email"
                  id="email"
                  className={`mt-1 block w-full px-4 py-2 border border-gray-300/10 rounded-xl shadow focus:outline-none placeholder-gray-400 ${
                    sending ? "bg-gray-100 cursor-not-allowed" : "cursor-text"
                  }`}
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                disabled={sending}
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition  ${sending ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
              >
                {sending ? <Loading size={12} /> : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default ResetPassword;

function SuccessSendMail() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/login");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="max-w-md mx-auto shadow border border-gray-50/10 rounded-2xl p-6 mt-10 text-center ">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h5 className="text-2xl font-semibold mb-3 ">ส่งอีเมลสำเร็จแล้ว</h5>
      <p className=" mb-3">
        หากอีเมลนี้อยู่ในระบบ คุณจะได้รับลิงก์สำหรับรีเซ็ตรหัสผ่าน
      </p>
      <div className="flex items-start gap-2 justify-center text-yellow-600 dark:text-yellow-400 text-sm">
        <AlertTriangle className="h-5 w-5 mt-0.5" />
        <span>กรุณาตรวจสอบกล่องจดหมายของคุณ รวมถึงในกล่องสแปม (Spam) ด้วย</span>
      </div>
      <p className="text-sm  mt-4">
        จะไปที่หน้าเข้าสู่ระบบใน <span>{countdown}</span> วินาที
      </p>
    </div>
  );
}

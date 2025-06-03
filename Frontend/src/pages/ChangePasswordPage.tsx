import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import ChangePassword from "../components/ChangePassword";
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import Loading from "../components/UI/Loading";

export interface ChangePasswordProps {
  email: string
  message: string
  success: boolean
  userId:  number
}

function ChangePasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<ChangePasswordProps | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/reset-verifyToken`, {
          headers: {
            Authorization: token,
          },
        });
        setData(response.data);
      } catch (error: any) {
        console.error("Invalid or expired token");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, navigate]);

  return (
    <>
      <Helmet>
        <title>Change Password | SchedulePro</title>
        <meta name="description" content="Reset your password for SchedulePro" />
      </Helmet>
      <main className="w-full min-h-screen p-4">
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <Loading size={20}/>
          </div>
        ) : data?.success ? (
          <ChangePassword token={token!} />
        ) : (
          <div className="flex items-center justify-center min-h-screen">
          <div className="shadow rounded-2xl p-8 max-w-md w-full text-center border border-red-200 dark:border-red-500">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-full">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-semibold ">
                ลิงก์หมดอายุหรือไม่ถูกต้อง
              </h2>
              <p className="text-sm ">
                กรุณาขอรหัสรีเซ็ตรหัสผ่านใหม่อีกครั้งผ่านหน้า “ลืมรหัสผ่าน”
              </p>
              <button
                onClick={() => navigate("/auth/resetpassword")}
                className="mt-4 px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium shadow transition hover:cursor-pointer"
              >
                กลับไปหน้าลืมรหัสผ่าน
              </button>
            </div>
          </div>
          </div>
        )}
      </main>
    </>
  );
}

export default ChangePasswordPage;

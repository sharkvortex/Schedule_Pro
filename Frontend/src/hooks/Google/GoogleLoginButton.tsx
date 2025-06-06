import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          `/api/auth/google`,
          {
            access_token: tokenResponse.access_token,
          },
          { withCredentials: true }
        );

        toast.success("Login successful! 🎉");
        navigate("/");

        return res.data;
      } catch (error) {
        const err = error as any;
        const errorMessage =
          err?.response?.data?.message || "เข้าสู่ระบบล้มเหลว 😢";

        console.error("Google login failed", err);
        toast.error(errorMessage);
      }
    },
    onError: () => {
      console.error("Google login was unsuccessful");
      toast.error("เกิดข้อผิดพลาดขณะเข้าสู่ระบบด้วย Google");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="w-full border border-gray-50/5 flex items-center justify-center gap-2 py-2 px-4 rounded shadow transition-colors hover:cursor-pointer"
    >
      <FcGoogle className="text-xl" />
      Sign in with Google
    </button>
  );
}

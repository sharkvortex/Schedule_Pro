import FormLogin from "../components/FormLogin"
import { Helmet } from "react-helmet-async"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
import { useNavigate  } from "react-router-dom";
function Login() {
  const auth = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (auth?.isLogin) {
      navigate('/');
    }
  }, [auth?.isLogin]);

  return (
    <>
    <Helmet>
      <title>Login | SchedulePro</title>
      <meta name="description" content="Login page for Schedule Pro" />
    </Helmet>
    <div className="w-full h-full  flex justify-center items-center ">
        <FormLogin/>
    </div>
    </>
  )
}

export default Login
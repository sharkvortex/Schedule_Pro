import FormRegister from "../components/FormRegister"
import { Helmet } from "react-helmet-async"
import { useAuth } from "../context/AuthContext"
import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";
function Register() {
  const navigate = useNavigate();
 const auth = useAuth();

 useEffect(() => {
  if (auth?.isLogin) {
    navigate('/');
  }
}, [auth?.isLogin]);

  return (
    <>
    <Helmet>
      <title>Register | SchedulePro</title>
      <meta name="description" content="Login page for Schedule Pro" />
    </Helmet>
    <div className='w-full h-full  flex justify-center items-center'>
        <FormRegister/>
    </div>
    </>
  )
}

export default Register
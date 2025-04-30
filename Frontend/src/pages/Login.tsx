import FormLogin from "../components/FormLogin"
import { Helmet } from "react-helmet-async"
function Login() {
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
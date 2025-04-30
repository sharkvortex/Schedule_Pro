import FormRegister from "../components/FormRegister"
import { Helmet } from "react-helmet-async"
function Register() {
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
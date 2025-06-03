import { Helmet } from "react-helmet-async"
import ResetPassword from "../components/ResetPassword"
function ResetPassPage() {
  return (
    <>
    <Helmet>
      <title>ResetPassword | SchedulePro</title>
      <meta name="description" content="Login page for Schedule Pro" />
    </Helmet>
    <main className="w-full min-h-screen">
        <ResetPassword/>
    </main>
    </>
  )
}

export default ResetPassPage
import { Helmet } from "react-helmet-async";
import SliderDashboard from "../../components/Dashbaord/SliderDashboard";
import ManageSubject from "../../components/Dashbaord/ManageSubject/ManageSubject";
function ManageSubjectPage() {
  return (
    <>
      <Helmet>
        <title>ManageSubject | SchedulePro</title>
        <meta
          name="description"
          content="ManageSubject to SchedulePro – your personal assistant for managing class schedules and tasks with ease."
        />
      </Helmet>
      <main className="w-full h-screen">
        <div className="flex w-full h-full">
            <SliderDashboard/>
          {/*  */}
          <ManageSubject/>
        </div>
      </main>
    </>
  )
}

export default ManageSubjectPage
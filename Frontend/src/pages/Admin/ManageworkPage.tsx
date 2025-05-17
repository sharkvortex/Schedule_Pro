import ManageWorks from "../../components/Dashbaord/ManageWork/ManageWorks";
import SliderDashboard from "../../components/Dashbaord/SliderDashboard";
import { Helmet } from "react-helmet-async";
function ManageworkPage() {
  return (
    <>
      <Helmet>
        <title>ManageWorks | SchedulePro</title>
        <meta
          name="description"
          content="ManageUser to SchedulePro – your personal assistant for managing class schedules and tasks with ease."
        />
      </Helmet>
      <main className="flex w-full min-h-screen">
        <div className="flex w-full h-full">
          <SliderDashboard />
          <ManageWorks />
        </div>
      </main>
    </>
  );
}

export default ManageworkPage;

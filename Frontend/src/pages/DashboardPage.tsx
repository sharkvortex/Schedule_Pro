import Dashboard from "../components/Dashbaord/Dashbaord";
import SliderDashboard from "../components/Dashbaord/SliderDashboard";
import { Helmet } from "react-helmet-async";

function DashboardPage() {

  return (
    <>
    <Helmet>
    <title>Dashboard | SchedulePro</title>
        <meta
          name="description"
          content="Dashboard to SchedulePro – your personal assistant for managing class schedules and tasks with ease."
        />
    </Helmet>
    <main className="w-full h-screen">
      <div className="flex w-full h-full">
      <SliderDashboard/>
        <Dashboard />
      </div>
    </main>
    </>
  );
}

export default DashboardPage;

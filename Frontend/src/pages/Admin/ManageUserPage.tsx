import { Helmet } from "react-helmet-async";
import SliderDashboard from "../../components/Dashbaord/SliderDashboard";
import ManageUser from "../../components/Dashbaord/ManageUser/ManageUser";
function ManageUserPage() {
  return (
    <>
      <Helmet>
        <title>ManageUser | SchedulePro</title>
        <meta
          name="description"
          content="ManageUser to SchedulePro – your personal assistant for managing class schedules and tasks with ease."
        />
      </Helmet>
      <main className="w-full h-screen">
        <div className="flex w-full h-full">
            <SliderDashboard/>
            <div className="flex-1">
            <ManageUser/>
            </div>
            
        </div>
      </main>
    </>
  );
}

export default ManageUserPage;

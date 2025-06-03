
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
function ProfilePage() {
  return (
    <>
      <Helmet>
        <title>Profile | SchedulePro</title>
        <meta
          name="description"
          content="Welcome to SchedulePro – your personal assistant for managing class schedules and tasks with ease."
        />
      </Helmet>
      <main className="w-full min-h-screen">
        <div className="flex w-full h-full">
          <Navbar />
          <Profile/>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;

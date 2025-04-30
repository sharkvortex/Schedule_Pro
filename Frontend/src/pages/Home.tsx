import { Helmet } from "react-helmet-async";
import TableSchedule from "../components/TableSchedule";
import Navbar from "../components/Navbar";
function Home() {
  
  return (
    <>
      <Helmet>
        <title>Home | SchedulePro</title>
        <meta
          name="description"
          content="Welcome to SchedulePro – your personal assistant for managing class schedules and tasks with ease."
        />
      </Helmet>
      <main className="w-full h-screen">
        <div className="flex w-full h-full">
          <Navbar />
          <TableSchedule />
        </div>
      </main>
      
    </>
  );
}

export default Home;

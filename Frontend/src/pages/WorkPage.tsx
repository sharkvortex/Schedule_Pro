import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import DetailWork from "../components/Works/DetailWork";
function WorkPage() {
  return (
    <>
      <Helmet>
        <title>Subject | SchedulePro</title>
        <meta name="description" content="Subject page for Schedule Pro" />
      </Helmet>
      <main className="w-full min-h-screen">
        <div className="relative flex w-full h-full">
          <Navbar />
          <DetailWork />
        </div>
      </main>
    </>
  );
}

export default WorkPage;

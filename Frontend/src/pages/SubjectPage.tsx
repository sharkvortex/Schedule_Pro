import Subject from "../components/Subject";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
function SubjectPage() {
  return (
    <>
      <Helmet>
        <title>Subject | SchedulePro</title>
        <meta name="description" content="Subject page for Schedule Pro" />
      </Helmet>
      <main className="w-full min-h-screen">
        <div className="relative flex w-full h-full">
          
          <Navbar/>
          <Subject />
        </div>
      </main>
    </>
  );
}

export default SubjectPage;

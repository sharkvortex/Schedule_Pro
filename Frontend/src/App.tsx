import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./components/UI/Loader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubjectPage from "./pages/SubjectPage";
import DashboardPage from "./pages/DashboardPage";
import ManageUserPage from "./pages/Admin/ManageUserPage";
import ManageWorkPage from "./pages/Admin/ManageworkPage";
import { useAuth } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
function App() {
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    auth?.getAuthentication();
  }, [location]);

  if (auth?.isLoading) {
    return <Loader />;
  }
  
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subject/:subjectId" element={<SubjectPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/manage-users" element={<ManageUserPage />} />
        <Route path="/dashboard/manage-works" element={<ManageWorkPage />} />
      </Routes>
  );
}

export default App;

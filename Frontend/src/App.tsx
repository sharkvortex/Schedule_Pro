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
import ProtectedRoute from "./components/ProtectedRoute";
import ManageSubjectPage from "./pages/Admin/ManageSubjectPage";
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
        <Route path="/subject/:subjectId" element={<ProtectedRoute allowedRoles={["admin" , "member"]}><SubjectPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><DashboardPage/></ProtectedRoute>} />
        <Route path="/dashboard/manage-users" element={<ProtectedRoute allowedRoles={["admin"]}><ManageUserPage /></ProtectedRoute>} />
        <Route path="/dashboard/manage-works" element={<ProtectedRoute allowedRoles={["admin"]}><ManageWorkPage/></ProtectedRoute>} />
        <Route path="/dashboard/manage-subjects" element={<ProtectedRoute allowedRoles={["admin"]}><ManageSubjectPage/></ProtectedRoute>} />
       
      </Routes>
  );
}

export default App;

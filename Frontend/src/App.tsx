import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubjectPage from "./pages/SubjectPage";
import DashboardPage from "./pages/DashboardPage";
import ManageUserPage from "./pages/Admin/ManageUserPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/subject/:subjectId" element={<SubjectPage />}></Route>
      <Route path="/dashboard" element={<DashboardPage />}></Route>
      <Route path="/dashboard/manage-users" element={<ManageUserPage />}></Route>
    </Routes>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ClientDashboardLayout from "./layouts/ClientDashboardLayout";
import DashboardPage from "./pages/client/DashboardPage";

function App() {
  return (
    <Routes>
      {/* <!-- Common routes --> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />

      {/* <!-- Client Dashboard routes --> */}
      <Route path="/client" element={<ClientDashboardLayout />}>
        {/* Redirect to actual dashboard instead of just layout page */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;

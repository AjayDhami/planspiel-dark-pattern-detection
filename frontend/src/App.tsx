import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ClientDashboardLayout from "./layouts/ClientDashboardLayout";
import DashboardPage from "./pages/client/DashboardPage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      {/* <!-- Common routes --> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
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
